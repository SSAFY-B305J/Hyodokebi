import threading
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from models import db
from utils import matrix_factorization, predict

combined_matrix = None

def train_model(app):
    global combined_matrix
    with app.app_context():
        print("training start")
        
        vip = pd.read_sql("select vip_id from vip",con=db.engine)
        
        music = pd.read_sql(sql="SELECT * FROM MUSIC", con=db.engine)
        music['music_singer'] = music['music_singer'].str.lower()
        music['music_genre'] = music['music_genre'].str.lower()
        music['music_composer'] = music['music_composer'].str.lower()
        
        saved_music = pd.read_sql(sql="SELECT * FROM SAVED_MUSIC", con=db.engine)
        
        music_singer = pd.read_sql("select distinct music_singer from music",con=db.engine)
        music_composer = pd.read_sql("select distinct music_composer from music",con=db.engine)
        music_genre = pd.read_sql("select distinct music_genre from music",con=db.engine)
        
        user_singer = pd.DataFrame(np.zeros((len(vip), len(music_singer))), columns=music_singer['music_singer'], index=vip['vip_id'])
        singer_mapping = pd.read_sql(sql="SELECT music_id, music_singer FROM Music", con=db.engine).set_index('music_id').to_dict()['music_singer']
        
        for _, row in saved_music.iterrows():
            vip_id = row['vip_vip_id']
            music_id = row['music_music_id']
            
            music_singer = singer_mapping.get(music_id)
            user_singer.at[vip_id, music_singer] = 1

        user_singer = user_singer.sort_values(by='vip_id')
        user_singer_interaction_arr = user_singer.to_numpy()
        
        music_singer = music.pivot_table(index='music_name', columns='music_singer', aggfunc='size', fill_value=0)
        user_singer = user_singer.reindex(columns=music_singer.columns).fillna(0)
        music_singer_interaction_arr = music_singer.to_numpy()
        
        user_genre = pd.DataFrame(np.zeros((len(vip), len(music_genre))), columns=music_genre['music_genre'], index=vip['vip_id'])
        genre_mapping = pd.read_sql(sql="SELECT music_id, music_genre FROM Music", con=db.engine).set_index('music_id').to_dict()['music_genre']

        for _, row in saved_music.iterrows():
            vip_id = row['vip_vip_id']
            music_id = row['music_music_id']
            
            music_genre = genre_mapping.get(music_id)
            user_genre.at[vip_id, music_genre] = 1

        user_genre = user_genre.sort_values(by='vip_id')
        user_genre_interaction_arr = user_genre.to_numpy()

        music_genre = music.pivot_table(index='music_name', columns='music_genre', aggfunc='size', fill_value=0)
        user_genre = user_genre.reindex(columns=music_genre.columns).fillna(0)
        music_genre_interaction_arr = music_genre.to_numpy()
        
        user_composer = pd.DataFrame(np.zeros((len(vip), len(music_composer))), columns=music_composer['music_composer'], index=vip['vip_id'])
        composer_mapping = pd.read_sql(sql="SELECT music_id, music_composer FROM Music", con=db.engine).set_index('music_id').to_dict()['music_composer']
        for _, row in saved_music.iterrows():
            vip_id = row['vip_vip_id']
            music_id = row['music_music_id']
            
            music_composer = composer_mapping.get(music_id)
            user_composer.at[vip_id, music_composer] = 1

        user_composer = user_composer.sort_values(by='vip_id')
        user_composer_interaction_arr = user_composer.to_numpy()
        
        music_composer = music.pivot_table(index='music_name', columns='music_composer', aggfunc='size', fill_value=0)
        user_composer = user_composer.reindex(columns=music_composer.columns).fillna(0)
        music_composer_interaction_arr = music_composer.to_numpy()     
        
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
        
        print(predict_singer.shape)
        print(predict_composer.shape)
        print(predict_genre.shape)
        
        combined_matrix = (0.4 * predict_singer + 0.4 * predict_composer + 0.2 * predict_genre)
        print(combined_matrix)
        print(combined_matrix.shape)
        print("training complete")
        
def get_combined_matrix():
    return combined_matrix
        
def train_model_thread(app):
    threading.Thread(target=lambda: train_model(app)).start()