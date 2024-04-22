from config import app, db
from models.models import *
from sqlalchemy_serializer import Serializer

if __name__ == "__main__":
  with app.app_context():
    
    User.query.delete()
    Transaction.query.delete()
    Category.query.delete()
    Budget.query.delete()

    bills = Category(name = 'bills')
    entertainment = Category(name ='entertainment')


    # newuser1 = User(username="testing")
    # newuser1.password_hash = '12345'
    # newuser2 = User(username="test2")
    # newuser2.password_hash = 'testing12234'
    


    # newTransaction =  Transaction(amount= 24.99, description = "Food")
    # newTransaction2 =  Transaction(amount= 10.99, description = "Gas")

    

    db.session.add_all([bills, entertainment])
    db.session.commit()

    