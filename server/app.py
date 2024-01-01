from config import app
from flask_restful import Resource
from config import app, db, api
from models import User

if __name__ == "__main__":
  app.run(port=5555, debug=True)
