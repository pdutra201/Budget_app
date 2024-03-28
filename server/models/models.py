from .user import *
from .Transactions import *
from .budget import *
from .categories import *

from config import db

category_transaction_association_table = db.Table(
    'category_transaction_association',
    db.Column('category_id', db.Integer, db.ForeignKey('categories.id'), primary_key=True),
    db.Column('transaction_id', db.Integer, db.ForeignKey('transactions.id'), primary_key=True)
)