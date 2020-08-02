from flask import Flask
from database.service import Service

app = Flask(__name__, static_folder="../client/build", static_url_path="/")
mongo = Service()

from server.endpoint import *
