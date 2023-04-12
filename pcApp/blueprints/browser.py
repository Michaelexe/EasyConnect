from flask import Blueprint
from utils import browser as b_utils

browser = Blueprint("browser", __name__)

@browser.route("/open/")
def index():
    b_utils.open_browser()
    # Call browser method for opening / closing browser
    return "Connected endpoints: ", 200

@browser.route("/close/")
def index2():
    b_utils.close_browser()
    return "Connected endpoints: ", 200

