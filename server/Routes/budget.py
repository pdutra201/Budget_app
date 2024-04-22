from flask import request, session
from flask_restful import Resource
from config import db
from sqlalchemy.exc import IntegrityError


from models.models import *

class Budgets(Resource):
    def get(self, budget_id = None):
        user_id = session['user_id']
        if(user_id):
            if budget_id is None:
                budgets = Budget.query.filter(Budget.user_id == user_id).all()
                budget_data = []
            
                for budget in budgets:
                    budget_data.append(budget.to_dict())
                    
                return budget_data, 200

            else:
                # Return transactions for a specific budget
                budget = Budget.query.filter_by(id=budget_id).first()
                if budget:
                    transactions = [transaction.to_dict() for transaction in budget.transactions]
                    
                    return transactions, 200
                else:
                    return {"error": "Budget not found"}, 404

        else:
            return {"error": "not authorized"}
    
    def post(self):
        user_id = session['user_id']
        data = request.get_json()

        user_id = session['user_id']
        
        category = data['category']
        percentage = data['percentage']

        print(category)
        
        if(user_id):
            try:
                newBudget = Budget( percentage=percentage, category_id = category, user_id = user_id)
                db.session.add(newBudget)
                db.session.commit()
                
                
                return {}
            except ImportError:
                return {'error': 'unable to access database'}
    
   