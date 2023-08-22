from flask_cors import CORS
from flask import Flask
from requests import get
import json
from dotenv import load_dotenv
import os
import base64
from requests import post

load_dotenv()

client_id = os.getenv('SPOTIFY_CLIENT_ID')
client_secret = os.getenv('SPOTIFY_CLIENT_SECRET')

def get_token():
    auth_string = client_id + ':' + client_secret
    auth_bytes = auth_string.encode('utf-8')
    auth_base64 = str(base64.b64encode(auth_bytes), 'utf-8')
    
    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "client_credentials"}
    
    result = post(url=url, headers=headers, data=data)
    json_result = json.loads(result.content)
    token = json_result['access_token']
    
    return token

def get_auth_header(token):
    return {"Authorization": "Bearer " + token}

spotify_token = get_token()
spotify_headers = get_auth_header(token=spotify_token)

app = Flask(__name__)
CORS(app=app)

def seekFunction(artist_name):
    url = 'https://api.spotify.com/v1/search'
    query = f"?q={artist_name}&type=artist&limit=6"
    
    query_url = url + query
    result = get(query_url, headers=spotify_headers)
    json_result = json.loads(result.content)['artists']['items']
    
    if len(json_result) == 0:
        print("No artists found")
        return None
        
    return json_result[0]

## ROUTES

@app.route("/api/search/<string:id>")
def searchArtist(id):
    if (len(id) > 0):
        results = seekFunction(id)
    else:
        results = None
    return results

# http://127.0.0.1:5328/api/python
@app.route("/api/python")
def hello_world():
    return f"<p>Hello Universe</p>"

if __name__ == "__main__":
    app.run(debug=True, load_dotenv=True)