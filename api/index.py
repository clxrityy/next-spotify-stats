import sys
from __init__ import app
from helpers.seek import *

sys.path.insert(0, 'api/__init__.py')
sys.path.insert(0, 'api/helpers/__init__.py')



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