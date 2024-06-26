from config import app

from config import app, api


from Routes.routes import *



api.add_resource(ClearSession, '/clear', endpoint='clear')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/checksession', endpoint='checksession')
api.add_resource(Logout, '/logout', endpoint="logout")
api.add_resource(Login, '/login', endpoint="login")
api.add_resource(Transactions, '/transactions', '/transactions/<int:trans_id>')
api.add_resource(EditUser, '/home', '/home/<int:user_id>')
api.add_resource(Budgets, '/budget', '/budget/<int:budget_id>/transactions', '/budget/<int:budget_id>')
api.add_resource(Categories, '/categories', '/categories/<string:cat_name>')



if __name__ == "__main__":
  app.run(port=5555, debug=True)
