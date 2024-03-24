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
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    

    categories = db.relationship('Category', back_populates='transaction')
    
    budgets = association_proxy('categories', 'budget')

    serialize_rules = ( '-budgets.transactions', '-user.transactions', '-user._password_hash')

def __repr__(self):
    return f'Transaction: {self.description},  {self.amount}, {self.date}'