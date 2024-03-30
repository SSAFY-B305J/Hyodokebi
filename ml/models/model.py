#!/usr/bin/env python
# coding: utf-8



from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import pandas as pd
import numpy as np
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import MinMaxScaler

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

db_config = {
    'host': '127.0.0.1',  
    'port': 3306,         
    'user': 'dokebi',     
    'password': 'dokebi%40%401234',  
    'database': 'dokebi', 
}

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['database']}"

# db 연결
db = SQLAlchemy(app)





# 훈련에 사용될 함수



# 실제 R 행렬과 예측 행렬의 오차를 구하는 함수
def calculate_rmse(R, P, Q, non_zeros):
    error = 0

    full_pred_matrix = np.dot(P, Q.T)

    # 여기서 non_zeros는 아래 함수에서 확인할 수 있다.
    x_non_zero_ind = [non_zeros[0] for non_zeros in non_zeros]
    y_non_zero_ind = [non_zeros[1] for non_zeros in non_zeros]

    # 원 행렬 R에서 0이 아닌 값들만 추출한다.
    R_non_zeros = R[x_non_zero_ind, y_non_zero_ind]

    # 예측 행렬에서 원 행렬 R에서 0이 아닌 위치의 값들만 추출하여 저장한다.
    full_pred_matrix_non_zeros = full_pred_matrix[x_non_zero_ind, y_non_zero_ind]

    mse = mean_squared_error(R_non_zeros, full_pred_matrix_non_zeros)
    rmse = np.sqrt(mse)

    return rmse

# 행렬분해하는 함수
def matrix_factorization(R, K, steps=200, learning_rate=0.01, r_lambda=0.01):
    num_users, num_items = R.shape

    np.random.seed(1)
    P = np.random.normal(scale=1.0/K, size=(num_users, K))
    Q = np.random.normal(scale=1.0/K, size=(num_items, K))
    
    # R>0인 행 위치, 열 위치, 값을 non_zeros 리스트에 저장한다.
    non_zeros = [ (i, j, R[i, j]) for i in range(num_users)
                  for j in range(num_items) if R[i, j] > 0 ]

    # SGD 기법으로 P, Q 매트릭스를 업데이트 함
    for step in range(steps):
        for i, j, r in non_zeros:
            # 잔차 구함
            eij = r - np.dot(P[i, :], Q[j, :].T)

            # Regulation을 반영한 SGD 업데이터 적용
            P[i, :] = P[i, :] + learning_rate*(eij * Q[j, :] - r_lambda*P[i, :])
            Q[j, :] = Q[j, :] + learning_rate*(eij * P[i, :] - r_lambda*Q[j, :])

        rmse = calculate_rmse(R, P, Q, non_zeros)
        # if step % 10 == 0:
        #     print("iter step: {0}, rmse: {1:4f}".format(step, rmse))

    return P, Q

# 예측 확률 구하기
def predict(P, Q):
    return np.dot(P, Q.T)





# # 서비스에 사용할 함수

# ### 서버가 시작될 때 기본으로 실행될 함수



# def makeDefaultDataSet():
#     # 메뉴 데이터 가져오기
#     cursor.execute("SELECT * FROM menu")
#     menu_info = cursor.fetchall()

#     # 재료 데이터 가져오기
#     cursor.execute("SELECT * FROM mi")
#     igd_info = cursor.fetchall()
    
#     # 조리법 데이터 가져오기
#     cursor.execute("SELECT * from wtc")
#     wtc_info = cursor.fetchall()
    
#     # 다 합치기
#     menu_data = pd.DataFrame()
#     for row in menuInfo:
#
#
#     user_igd_info = pd.DataFrame(0, index = [vip_id for vip_id in menu_data.index], columns = [ menu_id for menu_data.columns ])
#     return user_igd_info, menu_info

# 선호확률 학습하기
def menu_training(user_igd_info, K=51 ,learning_rate = 0.01, steps = 500 ):
    user_igd_data = user_igd_info.to_numpy()
    P, Q = matrix_factorization(user_igd_data*0.1, K, learning_rate = 0.01, steps = 500 )
    predicted_R = predict(P,Q)
    return predicted_R


# ### 추천할 때 사용될 함수


# 데이터 수정하기
def updateDataSet(user_igd_info, vip_id, menu_ids):
    vip_id = int(vip_id)
    user_igd_info_tmp = user_igd_info.copy()
    for menu_id in menu_ids:
        menu_id = int(menu_id)
        user_igd_info_tmp.iloc[vip_id-1, menu_id] += 2
    return user_igd_info_tmp

    
# 에측결과를 토대로 메뉴 선택하기
# model_prac.ipynb -> predicted_menu_V4
def predicted_menu(predicted, menu_info, user_no, nMenu=9):
    
    user_no = int(user_no)
    menu_data = menu_info.to_numpy()
    user_like_igd = predicted[user_no-1].copy()
    predicted_menu = []

    user_like_menu = predict(user_like_igd, menu_data*0.1)

    for i in range(0,nMenu):
        max_idx = np.argmax(user_like_menu)
        if user_like_menu[max_idx] < 0 or user_like_menu[max_idx] == 0 : break
        predicted_menu += [max_idx]
        user_like_menu[max_idx] = 0

    recommended_menu = recommend_menu(predicted_menu)
    return recommended_menu



def recommend_menu(menu_ids):
    recommended_menu = pd.DataFrame(columns=["menu_id", "menu_name", "cate_image"])
    print(recommended_menu)
    for idx in range(0,len(menu_ids)):
        sql_query = "SELECT m.menu_id, m.menu_name, m.cate_image FROM (SELECT * FROM menu LEFT OUTER JOIN cate ON menu.cate_cate_id = cate.cate_id) m WHERE m.menu_id = %s" %menu_ids[idx]
        menu_info = pd.read_sql(sql=sql_query, con=db.engine)
        if not menu_info.empty:
            recommended_menu = pd.concat([recommended_menu, menu_info], axis=0)
            
    return recommended_menu.to_json(orient="records")


######################

def train_model():
    global combined_matrix
    with app.app_context():
        print("training start2")
        df_origin = pd.read_sql(sql="SELECT * FROM Music", con=db.engine)
        
        sql_query = """
        SELECT Music.*, Saved_Music.vip_vip_id as user
        FROM Saved_Music
        JOIN Music ON Saved_Music.music_music_id = Music.music_id
        """
        
        merged_df = pd.read_sql(sql=sql_query, con=db.engine)
        
        merged_df = pd.concat([merged_df, df_origin], ignore_index=True)
        merged_df.drop_duplicates(subset='music_name', inplace=True)
        
        merged_df['user'] = merged_df['user'].fillna('UnknownUser')
        
        user_singer_interaction = merged_df.pivot_table(index='user', columns='music_singer', aggfunc='size', fill_value=0)
        user_singer_interaction = user_singer_interaction.drop('UnknownUser')
        user_singer_interaction_arr = user_singer_interaction.to_numpy()
        
        music_singer_interaction = merged_df.pivot_table(index='music_name', columns='music_singer', aggfunc='size', fill_value=0)
        music_singer_interaction_arr = music_singer_interaction.to_numpy()
        
        genre_expanded = merged_df['music_genre'].str.get_dummies(sep=', ')
        merged_df_expanded = pd.concat([merged_df, genre_expanded], axis=1)
        
        user_genre_interaction = merged_df_expanded.groupby('user')[genre_expanded.columns].sum()
        user_genre_interaction = user_genre_interaction.drop('UnknownUser')
        user_genre_interaction_arr = user_genre_interaction.to_numpy()
        
        music_genre_interaction = merged_df_expanded.groupby('music_name')[genre_expanded.columns].sum()
        music_genre_interaction_arr = music_genre_interaction.to_numpy()
        
        user_composer_interaction = merged_df.pivot_table(index='user', columns='music_composer', fill_value=0, aggfunc='size')
        user_composer_interaction = user_composer_interaction.drop('UnknownUser')
        user_composer_interaction_arr = user_composer_interaction.to_numpy()
        
        music_composer_interaction = merged_df.pivot_table(index='music_name', columns='music_composer', aggfunc='size', fill_value=0)
        music_composer_interaction_arr = music_composer_interaction.to_numpy()
        
        predicted_R_V2_composer = predict(user_composer_interaction_arr,music_composer_interaction_arr)
        predicted_R_V2_singer = predict(user_singer_interaction_arr,music_singer_interaction_arr)
        predicted_R_V2_genre = predict(user_genre_interaction_arr,music_genre_interaction_arr)
        
        scaler = MinMaxScaler(feature_range=(-1, 1))
        scaled_genre = scaler.fit_transform(predicted_R_V2_genre)
        scaled_composer = scaler.fit_transform(predicted_R_V2_composer)
        scaled_singer = scaler.fit_transform(predicted_R_V2_singer)
        
        P_singer,Q_singer = matrix_factorization(scaled_singer, 10, 300)
        P_composer,Q_composer = matrix_factorization(scaled_composer, 10, 300)
        P_genre,Q_genre = matrix_factorization(scaled_genre, 10, 100)
        
        predict_singer = predict(P_singer,Q_singer)
        predict_composer = predict(P_composer,Q_composer)
        predict_genre = predict(P_genre,Q_genre)
        
        print("training complete2")
        combined_matrix = (0.4 * predict_singer + 0.4 * predict_composer + 0.2 * predict_genre)
    #return combined_matrix


class Music(db.Model):
    __tablename__ = 'music'  
    music_id = db.Column(db.Integer, primary_key=True)
    music_name = db.Column(db.String)
    music_year = db.Column(db.Integer)
    music_genre = db.Column(db.String)
    music_singer = db.Column(db.String)
    music_lyrics = db.Column(db.Text)
    music_img = db.Column(db.String)
    music_composer = db.Column(db.String)
    music_like = db.Column(db.Integer)
    
    def to_dict(self):
        return {
            'musicId': self.music_id,
            'musicName': self.music_name,
            'musicYear': self.music_year,
            'musicGenre': self.music_genre,
            'musicSinger': self.music_singer,
            'musicLyrics': self.music_lyrics,
            'musicImg': self.music_img,
            'musicComposer': self.music_composer,
            'musicLike': self.music_like
        }
