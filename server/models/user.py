from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy


from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)
    income = db.Column(db.Float, default = 0.00)
    
    
    transactions = db.relationship('Transaction', backref='user')
    
    categories = db.relationship('Category', back_populates = 'user')

    budgets = association_proxy('categories', 'budget')
    
    serialize_rules = ('-transactions.user', '-budgets.user', '-categories.user', 
                       '-categories.budget', '-categories.transaction', '-budgets.categories', 
                       '-transactions.categories', '-categories.budget.user', '-budgets.transactions'
                       ,)

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'User {self.username}, ID: {self.id}'
    

    