from flask import request, session
from flask_restful import Resource
from config import db

from models.models import *

class Categories(Resource):
    def get(self):
        user_id = session['user_id']
        if(user_id):
            categories = Category.query.all()
            category_data = []
            for category in categories:
                category_data.append(category.to_dict())
            return category_data, 200
        else:
            return {"error": "not authorized"}
        
    def patch(self, cat_name):
        user_id = session['user_id']
        data = request.get_json()
        trans_id = data['trans_id']
        # print(data)
        
        cat = Category.query.filter(Category.name == cat_name, Category.user_id == user_id).first()
        trans = Transaction.query.filter(Transaction.id == trans_id, Transaction.user_id == user_id).first()
        # breakpoint()
        if(cat):
            cat.transactions.append(trans)
            db.session.commit()
            return {'message': 'Category assigned to transaction'},
        else:
            return {"error: edit could not be completed"}, 400