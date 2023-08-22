from requests import get
import json
from api.helpers.credentials import spotify_headers
import sys

sys.path.insert(0, 'api/helpers/credentials.py')

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

