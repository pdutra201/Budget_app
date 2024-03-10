from sqlalchemy_serializer import SerializerMixin
from config import db

class Budget(db.Model, SerializerMixin):
    __tablename__ = "budgets"


    id = db.Column(db.Integer, primary_key=True)
    percentage = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    serialize_rules = ('-user.budgets')
    

def __repr__(self):
    return f'{self.percentage}'