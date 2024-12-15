from flask import render_template, redirect, url_for, Blueprint
from datetime import datetime
import json

main = Blueprint('main', __name__)


@main.route('/hello_world')
def index():
    return json.dumps({"message": "Hello world!"}), 200