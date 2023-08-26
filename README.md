# [<div style='display:flex;gap:10px;align-items:center;justify-conent:center;'><img src='public/logo.png' alt='logo' style='width:25px;height:25px;' /> NEXT SPOTIFY STATS</div>](https://next-spotify-stats.vercel.app/)

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

## Create API routes with Flask

```zsh
pip install flask
```

```py
from flask import Flask

app = Flask(__name__)

if __name__ == "__main__":
    app.run(load_dotenv=True)
```

### Example route

```py
# http://127.0.0.1:5328/api/python
@app.route("/api/python")
def hello_world():
    return f"<h1>Hello World</h1>"
```

## Display data on the front end

- Create an example route to fetch an example piece of data, such as your access token.

```py
token = get_token()

@app.route("/api/token")
def tokenRoute():
    return token
```

- Now fetch the data in a client component.

`/components/Token.tsx`

```tsx
'use client';
import React, { useCallback } from 'react';

const Token = async () => {

    async function getData() {
        const res = await fetch('http://127.0.0.1:5328/api/token');

        if (!res.ok) {
            throw new Error("Failed to fetch data")
        }
        return res.json();
    }

    const data = await getData();

    return (
        <p>
            {data}
        </p>
    )

}
```

## Template repository from Vercel

View vercel's `nextjs-flask` template [here](https://nextjs-flask-starter.vercel.app/).

```zsh
npx create-next-app nextjs-flask --example "https://github.com/vercel/examples/tree/main/python/nextjs-flask"
```

### —

> The Flask server will be running on http://127.0.0.1:5328 – feel free to change the port in `package.json` (you'll also need to update it in `next.config.js`).
