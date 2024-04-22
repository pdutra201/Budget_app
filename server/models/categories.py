from sqlalchemy_serializer import SerializerMixin
from config import db
from sqlalchemy.ext.associationproxy import association_proxy


class Category(db.Model, SerializerMixin):
    __tablename__  = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique = True, nullable = False)
    

    user = association_proxy('budgets', 'category')
    
    budgets = db.relationship('Budget', back_populates='category')
    
    serialize_rules = ('-budgets.category', '-user.category', 
                       '-transactions.user_id', )


    def __repr__(self):
        return f'{self.name}'
