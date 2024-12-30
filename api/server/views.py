from flask import Blueprint, request, jsonify, make_response, send_file, send_from_directory
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, unset_jwt_cookies
from .models import User
from . import db
from PIL import Image
import os

STATIC_FOLDER = '/static'

# Blueprints
main = Blueprint('main', __name__)
auth = Blueprint('auth', __name__)
profile = Blueprint('profile', __name__)


UPLOAD_FOLDER = '../avatars'

# Mappings
@auth.route('/api/registration', methods=["POST"])
def registration():
    username = request.json.get('username')
    password = request.json.get('password')
    verify_password = request.json.get('verifyPassword')

    if not username or not password or not verify_password:
        return jsonify({"error": "Missing required fields"}), 400

    if password != verify_password:
        return jsonify({"error": "Passwords do not match"}), 400

    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({"error": "Username already exists"}), 400

    new_user = User(username=username, pwd=password)
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=username)
    response = make_response(jsonify({"access_token_cookie": access_token}), 200)
    return response

@auth.route('/api/login', methods=["POST"])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid username or password"}), 400
    access_token = create_access_token(identity=username)
    response = make_response(jsonify({"access_token_cookie": access_token}), 200)
    return response

@auth.route('/api/logout', methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@profile.route('/api/get_avatar', methods=["POST"])
def get_avatar():
    user = User.query.get(request.json['id'])
    if not user:
        return jsonify({"error": "No user"}), 400
    if not user.avatar:
        return send_file('/home/feredeyz/programming/python/backend/projects/persona/api/avatars/default.jpg', mimetype='image/png')
    return send_file(user.avatar, mimetype='image/png')

@profile.route('/api/change_avatar', methods=["POST"])
def change_avatar():
    id = request.form['id']
    file = request.files['image']
    img = Image.open(file.stream)
    img = img.convert("RGB")
    save_path = os.path.join('../api/avatars', f'avatar{id}.png')
    img.save(save_path)
    user = User.query.get(id)
    user.avatar = os.path.abspath(f'../api/avatars/avatar{user.id}.png')
    db.session.commit()
    return jsonify({"msg": "Changed avatar"}), 200


@main.route('/api/user', methods=["GET"])
@jwt_required()
def user():
    user = User.query.filter_by(username=get_jwt_identity()).first()
    return jsonify({
        "username": user.username,
        "avatar": user.avatar if user.avatar else None,
        "id": user.id,
    }), 200
    
@main.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(STATIC_FOLDER, filename)    