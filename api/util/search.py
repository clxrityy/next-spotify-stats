from requests import post, get
import json
from util.token import headers

def search(artist_name):
    url = 'https://api.spotify.com/v1/search'
    query = f"?q={artist_name}&type=artist&limit=6"
    
    query_url = url + query
    result = get(query_url, headers=headers)
    json_result = json.loads(result.content)['artists']['items']
    
    if len(json_result) == 0:
        print("No artists found")
        return None
        
    return json_result[0]

