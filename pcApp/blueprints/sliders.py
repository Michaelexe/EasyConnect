from flask import Blueprint, request
from utils import volume as b_util
from utils import brightness as l_util

sliders = Blueprint("sliders", __name__)

# Volume Subroute
@sliders.route("/volume/", methods=["GET"])
def volume():
    volume_percent = request.args.get("p")
    b_util.set_volume(volume_percent)
    return f"Set volume to {volume_percent}", 200;


# Brightness
@sliders.route("/brightness/", methods=["GET"])
def brightness():
    brightness_percent = request.args.get("p")
    l_util.set_brightness(brightness_percent)
    return "Success", 200;

