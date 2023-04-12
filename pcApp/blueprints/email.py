from flask import Blueprint
from tutorial import email_signin

email = Blueprint("email", __name__)

@email.route("/")
def index():
    email_signin.login()
    # Call browser method for opening / closing browser
    return "Success", 200