from flask import Flask, jsonify, request
from models import Music, db
from train_model import train_model_thread, get_combined_matrix
from config import Config
import numpy as np
import pandas as pd

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

@app.route("/pyapi/music/res", methods=['POST'])
def music_receive():
    
    musicRequestDto = request.json  # jpa에서 보낸 데이터  
    print(musicRequestDto)
    
    combined_matrix = get_combined_matrix()
    
    sorted_indices = np.argsort(combined_matrix[musicRequestDto['vipId']-1])[::-1]
    
    recommended_musics = Music.query.filter(
        Music.music_year.between(musicRequestDto['ageGroup'][0], musicRequestDto['ageGroup'][1]),
        Music.music_id.notin_(musicRequestDto['vipSavedMusics'] + musicRequestDto['vipDisLikedMusics'])
    ).all()

    music_df = pd.DataFrame([music.to_dict() for music in recommended_musics])
    existing_indices = music_df['musicId'].tolist()
    filtered_indices = [index for index in sorted_indices if index in existing_indices]

    sorted_music_df = music_df[music_df['musicId'].isin(filtered_indices)]
    sorted_music_df = sorted_music_df.set_index('musicId').loc[filtered_indices][:9].reset_index()

    music_ids = sorted_music_df['musicId'].tolist()

    final_recommended_musics = [db.session.get(Music, music_id) for music_id in music_ids]

    final_recommended_music_dicts = [music.to_dict() for music in final_recommended_musics]

    return jsonify(final_recommended_music_dicts)

if __name__ == '__main__':
    train_model_thread(app)
    app.run(debug=True)
