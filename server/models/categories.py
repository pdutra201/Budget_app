from sqlalchemy_serializer import SerializerMixin
from config import db

class Category(db.Model, SerializerMixin):
    __tablename__  = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    def __repr__(self):
        return f''
