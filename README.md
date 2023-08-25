# [<div style='display:flex;gap:10px;align-items:center'><img src='public/logo.png' alt='logo' style='width:50px;height:50px;' /> NEXT SPOTIFY STATS</div>](https://next-spotify-stats.vercel.app/)

## Use Python to connect to Spotify's API

- Create a developer Spotify application. (https://developer.spotify.com/dashboard)
- Add your client id & secret to `.env`.
- Load your environment variables

```py
from dotenv import load_dotenv
import os

load_dotenv()
client_id = os.getenv('SPOTIFY_CLIENT_ID')
client_secret = os.getenv('SPOTIFY_CLIENT_SECRET')
```

- Define a function to generate your authentication token & headers.
    - See [Spotify's Web API Documentation](https://developer.spotify.com/documentation/web-api/tutorials/getting-started) for more information on how this works.
    - Send a POST request to the token endpoint URI. (`"https://accounts.spotify.com/api/token"`)

```py
import base64
from requests import post
import json

def get_token():
    auth_string = f"{client_id}:{client_secret}"
    auth_bytes = auth_string.encode('utf-8')
    auth_base64 = str(base64.b64.encode(auth_bytes), 'utf-8')

    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {
        "grant-type": "client_credentials"
    }

    result = post(url=url, headers=headers, data=data)
    json_result = json.loads(result.content)
    token = json_result['access_token']

    return token

def get_auth_header(token):
    return {
        "Authorization": "Bearer " + token
    }
```