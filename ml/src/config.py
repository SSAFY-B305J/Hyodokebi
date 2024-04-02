class Config:
    JSON_AS_ASCII = False

    db_config = {
        'host': 'http://j10b305.p.ssafy.io',  
        'port': 3306,         
        'user': 'dokebi',     
        'password': 'dokebi%40%401234',  
        'database': 'dokebi', 
    }

    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['database']}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
