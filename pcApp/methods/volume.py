from comtypes import CLSCTX_ALL
from ctypes import cast, POINTER
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume

devices = AudioUtilities.GetSpeakers()
interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
volume = cast(interface, POINTER(IAudioEndpointVolume))

def set_volume(vol: str):
    vol = float(vol)
    volume.SetMasterVolumeLevelScalar(vol/100, None)

def get_volume():
    return round(volume.GetMasterVolumeLevelScalar() * 100)