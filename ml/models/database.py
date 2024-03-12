import os
import pymysql
from dotenv import load_dotenv

load_dotenv()

db = pymysql.connect(
    host=os.getenv("MYSQL_HOST"), 
    port=3306, 
    user=os.getenv("MYSQL_USER"), 
    passwd=os.getenv("MYSQL_PASSWORD"), 
    db=os.getenv("MYSQL_DB"), 
    charset='utf8'
)