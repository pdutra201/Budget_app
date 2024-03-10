from config import app, db
from models.models import *

if __name__ == "__main__":
  with app.app_context():
    
    User.query.delete()
    Transaction.query.delete()


    newuser1 = User(username="testing")
    newuser1.password_hash = '12345'
    newuser2 = User(username="test2")
    newuser2.password_hash = 'testing12234'


    newTransaction =  Transaction(amount= 24.99, description = "Food", user_id = 1)
    newTransaction2 =  Transaction(amount= 10.99, description = "Gas", user_id = 1)

    db.session.add_all([newuser1, newuser2, newTransaction, newTransaction2])
    db.session.commit()