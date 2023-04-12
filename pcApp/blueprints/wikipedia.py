from flask import Blueprint, request
from tutorial import wikipedia_search

wikipedia = Blueprint("wikipedia", __name__)

@wikipedia.route("/", methods=["GET"])
def index():
    query = request.args.get("q")
    wikipedia_search.search(query)
    return "Success", 200;