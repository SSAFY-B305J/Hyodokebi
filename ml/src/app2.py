# from flask import Flask, jsonify, request
# from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import *
# from sklearn.preprocessing import MinMaxScaler
# from sklearn.metrics import mean_squared_error
# import pandas as pd
# import numpy as np
# import threading

# app = Flask(__name__)
# app.config['JSON_AS_ASCII'] = False

# db_config = {
#     'host': '127.0.0.1',  
#     'port': 3306,         
#     'user': 'dokebi',     
#     'password': 'dokebi%40%401234',  
#     'database': 'dokebi', 
# }

# app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['database']}"

# # db 연결
# db = SQLAlchemy(app)

# def train_model():
#     global combined_matrix
#     with app.app_context():
#         print("training start2")
#         df_origin = pd.read_sql(sql="SELECT * FROM Music", con=db.engine)
        
#         sql_query = """
#         SELECT Music.*, Saved_Music.vip_vip_id as user
#         FROM Saved_Music
#         JOIN Music ON Saved_Music.music_music_id = Music.music_id
#         """
        
#         merged_df = pd.read_sql(sql=sql_query, con=db.engine)
        
#         merged_df = pd.concat([merged_df, df_origin], ignore_index=True)
#         merged_df.drop_duplicates(subset='music_name', inplace=True)
        
#         merged_df['user'] = merged_df['user'].fillna('UnknownUser')
        
#         user_singer_interaction = merged_df.pivot_table(index='user', columns='music_singer', aggfunc='size', fill_value=0)
#         user_singer_interaction = user_singer_interaction.drop('UnknownUser')
#         user_singer_interaction_arr = user_singer_interaction.to_numpy()
        
#         music_singer_interaction = merged_df.pivot_table(index='music_name', columns='music_singer', aggfunc='size', fill_value=0)
#         music_singer_interaction_arr = music_singer_interaction.to_numpy()
        
#         genre_expanded = merged_df['music_genre'].str.get_dummies(sep=', ')
#         merged_df_expanded = pd.concat([merged_df, genre_expanded], axis=1)
        
#         user_genre_interaction = merged_df_expanded.groupby('user')[genre_expanded.columns].sum()
#         user_genre_interaction = user_genre_interaction.drop('UnknownUser')
#         user_genre_interaction_arr = user_genre_interaction.to_numpy()
        
#         music_genre_interaction = merged_df_expanded.groupby('music_name')[genre_expanded.columns].sum()
#         music_genre_interaction_arr = music_genre_interaction.to_numpy()
        
#         user_composer_interaction = merged_df.pivot_table(index='user', columns='music_composer', fill_value=0, aggfunc='size')
#         user_composer_interaction = user_composer_interaction.drop('UnknownUser')
#         user_composer_interaction_arr = user_composer_interaction.to_numpy()
        
#         music_composer_interaction = merged_df.pivot_table(index='music_name', columns='music_composer', aggfunc='size', fill_value=0)
#         music_composer_interaction_arr = music_composer_interaction.to_numpy()
        
#         predicted_R_V2_composer = predict(user_composer_interaction_arr,music_composer_interaction_arr)
#         predicted_R_V2_singer = predict(user_singer_interaction_arr,music_singer_interaction_arr)
#         predicted_R_V2_genre = predict(user_genre_interaction_arr,music_genre_interaction_arr)
        
#         scaler = MinMaxScaler(feature_range=(-1, 1))
#         scaled_genre = scaler.fit_transform(predicted_R_V2_genre)
#         scaled_composer = scaler.fit_transform(predicted_R_V2_composer)
#         scaled_singer = scaler.fit_transform(predicted_R_V2_singer)
        
#         P_singer,Q_singer = matrix_factorization(scaled_singer, 10, 300)
#         P_composer,Q_composer = matrix_factorization(scaled_composer, 10, 300)
#         P_genre,Q_genre = matrix_factorization(scaled_genre, 10, 100)
        
#         predict_singer = predict(P_singer,Q_singer)
#         predict_composer = predict(P_composer,Q_composer)
#         predict_genre = predict(P_genre,Q_genre)
        
#         print("training complete2")
#         combined_matrix = (0.4 * predict_singer + 0.4 * predict_composer + 0.2 * predict_genre)
#     #return combined_matrix

# @app.route("/pyapi/music/res", methods=['POST'])
# def music_receive():
    
#     musicRequestDto = request.json  # jpa에서 보낸 데이터  
#     print(musicRequestDto)
    
#     sorted_indices = np.argsort(combined_matrix[musicRequestDto['vipId']-1])[::-1]
#     recommended_musics = Music.query.filter(
#         Music.music_id.in_(sorted_indices),
#         Music.music_year.between(musicRequestDto['ageGroup'][0], musicRequestDto['ageGroup'][1]),
#         Music.music_id.notin_(musicRequestDto['vipSavedMusics'] + musicRequestDto['vipDisLikedMusics'])
#     ).limit(9).all()
    
#     dict_musics = [music.to_dict() for music in recommended_musics]
#     return jsonify(dict_musics)
        
# class Music(db.Model):
#     __tablename__ = 'music'  
#     music_id = db.Column(db.Integer, primary_key=True)
#     music_name = db.Column(db.String)
#     music_year = db.Column(db.Integer)
#     music_genre = db.Column(db.String)
#     music_singer = db.Column(db.String)
#     music_lyrics = db.Column(db.Text)
#     music_img = db.Column(db.String)
#     music_composer = db.Column(db.String)
#     music_like = db.Column(db.Integer)
    
#     def to_dict(self):
#         return {
#             'musicId': self.music_id,
#             'musicName': self.music_name,
#             'musicYear': self.music_year,
#             'musicGenre': self.music_genre,
#             'musicSinger': self.music_singer,
#             'musicLyrics': self.music_lyrics,
#             'musicImg': self.music_img,
#             'musicComposer': self.music_composer,
#             'musicLike': self.music_like
#         }


# def calculate_rmse(R, P, Q, non_zeros):
#     error = 0

#     full_pred_matrix = np.dot(P, Q.T)

#     # 여기서 non_zeros는 아래 함수에서 확인할 수 있다.
#     x_non_zero_ind = [non_zeros[0] for non_zeros in non_zeros]
#     y_non_zero_ind = [non_zeros[1] for non_zeros in non_zeros]

#     # 원 행렬 R에서 0이 아닌 값들만 추출한다.
#     R_non_zeros = R[x_non_zero_ind, y_non_zero_ind]

#     # 예측 행렬에서 원 행렬 R에서 0이 아닌 위치의 값들만 추출하여 저장한다.
#     full_pred_matrix_non_zeros = full_pred_matrix[x_non_zero_ind, y_non_zero_ind]

#     mse = mean_squared_error(R_non_zeros, full_pred_matrix_non_zeros)
#     rmse = np.sqrt(mse)

#     return rmse

# def matrix_factorization(R, K, steps=200, learning_rate=0.01, r_lambda=0.01):
#     num_users, num_items = R.shape

#     np.random.seed(1)
#     P = np.random.normal(scale=1.0/K, size=(num_users, K))
#     Q = np.random.normal(scale=1.0/K, size=(num_items, K))
    
#     # R>0인 행 위치, 열 위치, 값을 non_zeros 리스트에 저장한다.
#     non_zeros = [ (i, j, R[i, j]) for i in range(num_users)
#                   for j in range(num_items) if R[i, j] > 0 ]

#     # SGD 기법으로 P, Q 매트릭스를 업데이트 함
#     for step in range(steps):
#         for i, j, r in non_zeros:
#             # 잔차 구함
#             eij = r - np.dot(P[i, :], Q[j, :].T)

#             # Regulation을 반영한 SGD 업데이터 적용
#             P[i, :] = P[i, :] + learning_rate*(eij * Q[j, :] - r_lambda*P[i, :])
#             Q[j, :] = Q[j, :] + learning_rate*(eij * P[i, :] - r_lambda*Q[j, :])

#         rmse = calculate_rmse(R, P, Q, non_zeros)
#         # if step % 10 == 0:
#         #     print("iter step: {0}, rmse: {1:4f}".format(step, rmse))

#     return P, Q

# # 예측 확률 구하기
# # P, Q => matric_fac... 의 결과로 얻은 두개의 행렬
# def predict(P, Q):
#     return np.dot(P, Q.T)

# if __name__ == '__main__':
#     threading.Thread(target=train_model).start()
#     app.run(debug=True)
