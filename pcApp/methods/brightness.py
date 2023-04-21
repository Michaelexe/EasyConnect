import screen_brightness_control as sbc

def set_brightness(brightness=0):
    sbc.set_brightness(brightness)

def get_brightness():
    return sbc.get_brightness()