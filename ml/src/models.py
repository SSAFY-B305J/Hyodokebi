from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

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
