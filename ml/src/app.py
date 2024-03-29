from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import *

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

@app.route("/pyapi/music/res", methods=['POST'])
def music_receive():
    
    musicRequestDto = request.json  # jpa에서 보낸 데이터  
    print(musicRequestDto)
    
    musics = Music.query.filter(
        Music.music_year.between(musicRequestDto['ageGroup'][0], musicRequestDto['ageGroup'][1]), # ageGroup 사이에 있는 데이터만 필터링
        Music.music_id.notin_(musicRequestDto['vipSavedMusics'] + musicRequestDto['vipDisLikedMusics']) # 이미 저장된 음악, 싫어요한 음악 필터링
    ).limit(9).all()
    
    dict_musics = [music.to_dict() for music in musics]
    return jsonify(dict_musics)
    
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