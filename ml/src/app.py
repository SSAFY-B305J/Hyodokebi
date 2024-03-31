from flask import Flask, jsonify, request
from models import Music, db
from train_model import train_model_thread, get_combined_matrix, training_recommend_menu, not_training_recommend_menu, get_pre_training
from config import Config
import numpy as np
import pandas as pd

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

@app.route("/pyapi/menu/<vip_id>", methods=['GET'])
def recommend_menu(vip_id):
    
    predicted_R, user_igd_info, menu_info = get_pre_training()
    
    menuIds = []
    if len(menuIds) > 0:
        recommend_menu = training_recommend_menu(user_igd_info, menu_info, vip_id, menuIds)
    else:
        recommend_menu = not_training_recommend_menu(predicted_R, menu_info, vip_id)
    print(recommend_menu)
    return jsonify(recommend_menu)

@app.route("/pyapi/music/res", methods=['POST'])
def music_receive():
    
    musicRequestDto = request.json  # jpa에서 보낸 데이터  
    print(musicRequestDto)
    
    combined_matrix = get_combined_matrix()
    
    sorted_indices = np.argsort(combined_matrix[musicRequestDto['vipId']-1])[::-1]
    
    if not musicRequestDto['vipSavedMusics']:
        recommended_musics = Music.query.filter(
            Music.music_year.between(musicRequestDto['ageGroup'][0], musicRequestDto['ageGroup'][1]),
            Music.music_id.notin_(musicRequestDto['vipDisLikedMusics'])
        ).order_by(Music.music_like.desc()).limit(9).all()
        if not recommended_musics: return jsonify(None)
        return [music.to_dict() for music in recommended_musics]
    
    recommended_musics = Music.query.filter(
        Music.music_year.between(musicRequestDto['ageGroup'][0], musicRequestDto['ageGroup'][1]),
        Music.music_id.notin_(musicRequestDto['vipSavedMusics'] + musicRequestDto['vipDisLikedMusics'])
    ).all()
    
    if not recommended_musics: return jsonify(None)

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
