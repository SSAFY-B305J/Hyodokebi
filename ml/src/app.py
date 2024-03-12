from flask import Flask

app = Flask(__name__)

@app.route("/pyapi")
def selectMenu():
    print("hello")