from flask import Blueprint, request
from utils import gpt

faq = Blueprint("faq", __name__)

@faq.route("/", methods=["POST"])
def index():
    return gpt.evaluate_input(request.get_json()['faqSearch']), 200
    # Call browser method for opening / closing browser


