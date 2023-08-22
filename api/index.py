from flask import Flask
from util.search import search
from flask_cors import CORS



app = Flask(__name__)
CORS(app)


@app.route("/api/search/<string:id>")
def searchArtist(id):
    if (len(id) > 0):
        results = search(id)
    else:
        results = None
    return results

# http://127.0.0.1:5328/api/python
@app.route("/api/python")
def hello_world():
    return f"<p>Hello Universe</p>"

if __name__ == "__main__":
    app.run(debug=True, load_dotenv=True)