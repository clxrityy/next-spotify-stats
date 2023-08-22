from dotenv import load_dotenv
import os
import base64
from requests import post
import json

# load env variables
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