from flask import Flask
from database.service import Service

app = Flask(__name__)
mongo = Service()

from server.endpoint import *
