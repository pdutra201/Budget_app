
from flask import request, session
from flask_restful import Resource
from config import db
from sqlalchemy.exc import IntegrityError

from models.models import *


class ClearSession(Resource):

    def delete(self):
    
        session['page_views'] = None
        session['user_id'] = None

        return {}, 204

class Signup(Resource):
    
    def post(self):
        json = request.get_json()
        username = json['username']
        password = json['password']
        try:
            user = User(username=username)
            user.password_hash=password
            db.session.add(user)
            db.session.commit()
            session["user_id"] = user.id
            return user.to_dict(), 201
        except IntegrityError:
            return {"error": "Username already exists"}, 422

class CheckSession(Resource):
    def get(self):
        user_id = session['user_id']
        if(user_id):
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        else:
            return {} 

class Login(Resource):
    def post(self):
        json = request.get_json()
        username= json['username']
        password = json['password']

        user = User.query.filter(User.username == username).first()
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 201
        else:
            return {'error': 'Incorrect username or password.'}, 401


class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {"message": "logged out successfully"}, 200    