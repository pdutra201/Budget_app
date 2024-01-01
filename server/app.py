from config import app
from flask_restful import Resource


if __name__ == "__main__":
  app.run(port=5555, debug=True)
