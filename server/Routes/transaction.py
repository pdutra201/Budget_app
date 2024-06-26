from flask import request, session
from flask_restful import Resource
from config import db
from sqlalchemy.exc import IntegrityError

from models.models import *


class Transactions(Resource):
    def get(self):
        user_id = session['user_id']
        if(user_id):
            trans = Transaction.query.join(Budget).filter(Budget.user_id == user_id).all()
            trans_data = []
            for transaction in trans:
                trans_data.append(transaction.to_dict())
            
            return trans_data, 200
        else:
            return {}
    
    def delete(self, trans_id):
        user_id = session.get('user_id')
        if(user_id):
            transaction = Transaction.query.join(Budget).filter(Transaction.id == trans_id, Budget.user_id == user_id ).first()
            if transaction:
                db.session.delete(transaction)
                db.session.commit()
                return {}, 204
            else:
                return {'error': 'Transaction not found'}, 404
        else:
            return {'error': 'not authorized'}, 401
        

    def post(self):
        data = request.get_json()
        print(data)
        
        dateObj = datetime.strptime(data['date'], "%Y-%m-%dT%H:%M:%S.%fZ")
        
        
        try:
            newTrans = Transaction(
                amount = float(data['amount']),
                description = data['description'],
                date = dateObj,
                budget_id = data['budget_id']
                
            )
            db.session.add(newTrans)
            db.session.commit()
            print(newTrans.to_dict())
            return newTrans.to_dict(), 201
        
        except ImportError:
            return {}
        
    def put(self, trans_id):
        user_id = session['user_id']
        data = request.get_json()
        
        transaction = Transaction.query.filter(Transaction.id == trans_id).first()
        
        if(transaction and user_id):
            transaction.amount = data['amount']
            transaction.description = data['description']
            transaction.date = datetime.strptime(data['date'], "%Y-%m-%dT%H:%M:%S.%fZ")
            transaction.budget_id = data['budget_id']


            db.session.commit()
            
            return {'message': 'Transaction updated successfully'}, 200
        
        else:
            return {'error': 'Edit could not be completed'}, 400