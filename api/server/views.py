from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import User
from . import db

# Blueprints
main = Blueprint('main', __name__)
auth = Blueprint('auth', __name__)

@auth.route('/registration', methods=["POST"])
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

@auth.route('/login', methods=["POST"])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid username or password"}), 400
    access_token = create_access_token(identity=username)
    response = make_response(jsonify({"access_token_cookie": access_token}), 200)
    return response

@main.route('/user', methods=["GET"])
@jwt_required()
def user():
    current_user = get_jwt_identity()
    print(current_user)
    return jsonify({
        "username": current_user
    }), 200