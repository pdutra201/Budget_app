from config import app
from flask import request, session
from flask_restful import Resource
from config import app, db, api
from sqlalchemy.exc import IntegrityError

from models import User

class ClearSession(Resource):

    def delete(self):
    
        session['page_views'] = None
        session['user_id'] = None

        return {}, 204

class Signup(Resource):
    def get(self):
        return "hi",200
    
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
            user = User.query().filter_by(User.id == user_id).first()
            return user.to_dict(), 200
        else:
            return {} 

class Login(Resource):
    pass

class Logout(Resource):
    pass

api.add_resource(ClearSession, '/clear', endpoint='clear')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/checksession', endpoint='checksession')


if __name__ == "__main__":
  app.run(port=5555, debug=True)
