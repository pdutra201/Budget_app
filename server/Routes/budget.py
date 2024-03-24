from flask import request, session
from flask_restful import Resource
from config import db
from sqlalchemy.exc import IntegrityError

from models.models import *

class Budgets(Resource):
    def get(self):
        user_id = session['user_id']
        if(user_id):
            budgets = Budget.query.filter(Budget.user_id == user_id).all()
            budget_data = []
            for budget in budgets:
                budget_data.append(budget.to_dict())
                
            return budget_data, 200
        
        else:
            return {"error": "not authorized"}
