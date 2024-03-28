from sqlalchemy_serializer import SerializerMixin
from config import db

class Category(db.Model, SerializerMixin):
    __tablename__  = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    budget_id = db.Column(db.Integer, db.ForeignKey('budgets.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    

    transactions = db.relationship('Transaction', secondary='category_transaction_association', back_populates='categories')
    
    budget = db.relationship('Budget', back_populates='categories')
    
    serialize_rules = ('-budget.categories', '-user.categories', '-transactions.categories', 
                       '-transactions.user_id',)


    def __repr__(self):
        return f'{self.name}'
