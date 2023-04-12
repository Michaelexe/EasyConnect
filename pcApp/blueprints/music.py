from flask import Blueprint, request
from tutorial import music;

music_bp = Blueprint("music_bp", __name__)

# @music_bp.route("/login/", methods=["GET"])
# def index():
#     music.log_in()
#     return f"Set volume to", 200;

@music_bp.route("/play_song/", methods=["GET"])
def play_song():
    music.play_song(request.args.get("song_name"))
    return "Success", 200

