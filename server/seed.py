from config import app, db
from models.user import User

if __name__ == "__main__":
  with app.app_context():
    
    User.query.delete()

    newuser1 = User(username="testing")
    newuser1.password_hash = '12345'
    newuser2 = User(username="test2")
    newuser2.password_hash = 'testing12234'

    db.session.add_all([newuser1, newuser2])
    db.session.commit()