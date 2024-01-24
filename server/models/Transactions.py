from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

from config import db

class Transaction(db.Model, SerializerMixin):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(200))
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

def __repr__(self):
    return f'Transaction: {self.description},  {self.amount}, {self.date}'