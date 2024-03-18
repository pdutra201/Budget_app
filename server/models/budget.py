from sqlalchemy_serializer import SerializerMixin
from config import db
from sqlalchemy.ext.associationproxy import association_proxy

class Budget(db.Model, SerializerMixin):
    __tablename__ = "budgets"


    id = db.Column(db.Integer, primary_key=True)
    percentage = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    categories = db.relationship('Category', back_populates='budget')

    transactions = association_proxy('categories', 'transaction')
    

    serialize_rules = ('-categories.budget' , '-transactions.budgets',)
    

def __repr__(self):
    return f'{self.percentage}'