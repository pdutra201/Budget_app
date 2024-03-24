from sqlalchemy_serializer import SerializerMixin
from config import db

class Category(db.Model, SerializerMixin):
    __tablename__  = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    budget_id = db.Column(db.Integer, db.ForeignKey('budgets.id'))
    transaction_id = db.Column(db.Integer, db.ForeignKey('transactions.id'))

    transaction = db.relationship('Transaction', back_populates='categories')
    
    budget = db.relationship('Budget', back_populates='categories')
    
    serialize_rules = ('budget.categories',)


    def __repr__(self):
        return f''
