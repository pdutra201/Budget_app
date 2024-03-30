from sqlalchemy_serializer import SerializerMixin
from config import db
from sqlalchemy.ext.associationproxy import association_proxy

class Budget(db.Model, SerializerMixin):
    __tablename__ = "budgets"


    id = db.Column(db.Integer, primary_key=True)
    percentage = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    

    categories = db.relationship('Category', back_populates='budget')

    transactions = association_proxy('categories', 'transactions')
    

    serialize_rules = ('-categories.budget', '-transactions.budgets', '-user._password_hash',
                       '-user.budgets', '-categories.user_id', )
    

    def __repr__(self):
        return f'{self.percentage}'