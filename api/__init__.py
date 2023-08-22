from flask import Flask
from flask_cors import CORS
import sys

sys.path.insert(0, './helpers/__init__.py')

app = Flask(__name__)
CORS(app)
