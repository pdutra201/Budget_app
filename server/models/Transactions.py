from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from sqlalchemy.ext.associationproxy import association_proxy


from config import db

class Transaction(db.Model, SerializerMixin):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(200) )
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    budget_id = db.Column(db.Integer, db.ForeignKey('budgets.id'))
    

    budget = db.relationship('Budget', back_populates = 'transactions')
    
    
    serialize_rules = ( '-budget.transactions',) 

def __repr__(self):
    return f'Transaction: {self.description},  {self.amount}, {self.date}'