import tkinter as tk
import tkinter.font as tkfont
from PIL import Image, ImageTk
import socketio

from methods import music
from methods import brightness
from methods import volume

root = tk.Tk()
root.title("EasyConnect")
root.geometry("800x450")

user = {}

sio = socketio.Client()
# url = 'http://localhost:3000'
url = 'https://eas-tf48.onrender.com'
sio.connect(url)

@sio.on('created')
def CreatedHandler(data):
    connectedFrame.tkraise()
    usernameValue.config(text=data["username"])
    passwordValue.config(text=data["password"])
    user["username"] = data["username"]
    user["password"] = data["password"]

@sio.on('youtube')
def onYoutube(data):
    music.play_song(data['search'])

@sio.on('volume')
def onVolume(data):
    volume.set_volume(data['volume'])

@sio.on('brightness')
def onBrightness(data):
    brightness.set_brightness(data['brightness'])

def createHandler(userEntry, passwordEntry):
    sio.emit("create", {
        "username": userEntry.get(),
        "password": passwordEntry.get(),
        "volume": volume.get_volume(),
        "brightness": brightness.get_brightness()[0],
    })

def exitHandler(root, socket):
    socket.disconnect()
    root.destroy()

def disconnectHandler(user):
    sio.emit("disconnect-pc", {
        "password": user["password"],
        "username": user["username"],
    })
    loginFrame.tkraise()
    user = {}


labelFont = tkfont.Font(size=16)
logo = Image.open("./assets/logo.png")
resized_logo = ImageTk.PhotoImage(logo.resize((333, 103)))

#connected Scene
connectedFrame = tk.Frame(root, bg="#333333")
connectedFrame.place(relwidth=1, relheight=1, x=0, y=0)

connectedLogoFrame = tk.Frame(connectedFrame)
connectedLogoFrame.pack(pady=20)
connectedLogoLabel = tk.Label(connectedLogoFrame, image=resized_logo, bg="#333333")
connectedLogoLabel.pack(anchor="center")

connectedLabel = tk.Label(connectedFrame, text="Type the following on your mobile device:", bg="#333333", fg="white", font=labelFont)
connectedLabel.pack(anchor="center")

connectedInputFrame =tk.Frame(connectedFrame, bg="#333333")
connectedInputFrame.pack(pady=20)

connectedUsernameLabel = tk.Label(connectedInputFrame,text="Username: ", bg="#333333", fg="white",font=labelFont)
connectedUsernameLabel.grid(row=0, column=0, pady=5)
usernameValue = tk.Label(connectedInputFrame, bg="#333333", fg="white", font=labelFont)
usernameValue.grid(row = 0, column = 1, pady = 10, ipady=5)

connectedPasswordLabel = tk.Label(connectedInputFrame,text="Password: ", bg="#333333", fg="white",font=labelFont)
connectedPasswordLabel.grid(row=1, column=0, pady=5)
passwordValue = tk.Label(connectedInputFrame, bg="#333333", fg="white", font=labelFont)
passwordValue.grid(row = 1, column = 1, pady = 10, ipady=5)

disconnectButton = tk.Button(connectedInputFrame, text = "Disconnect", bg = "Grey", fg = "Black", width=15, font=labelFont, command=lambda: disconnectHandler(user))
disconnectButton.grid(row=2, columnspan=2, pady=10)

#login scene
loginFrame = tk.Frame(root, bg="#333333")
loginFrame.place(relwidth=1, relheight=1, x=0, y=0)
logoFrame = tk.Frame(loginFrame)
logoFrame.pack(pady=20)


loginLogoLabel = tk.Label(logoFrame, image=resized_logo, bg="#333333")
loginLogoLabel.pack(anchor="center")

inputFrame = tk.Frame(loginFrame, bg="#333333")
inputFrame.pack(pady=20)

usernameLabel = tk.Label(inputFrame,text="Username: ", bg="#333333", fg="white",font=labelFont)
usernameLabel.grid(row=0, column=0, pady=5)
usernameInput = tk.Entry(inputFrame, width=30, font=labelFont)
usernameInput.grid(row = 0, column = 1, pady = 10, ipady=5)

passwordLabel = tk.Label(inputFrame,text="Password: ", bg="#333333", fg="white",font=labelFont)
passwordLabel.grid(row=1, column=0, pady=5)
passwordInput = tk.Entry(inputFrame, width=30, font=labelFont)
passwordInput.grid(row=1, column=1, pady=10, ipady=5)

loginButton = tk.Button(inputFrame, text = "Login", bg = "Grey", fg = "Black", width=15, font=labelFont, command=lambda: createHandler(usernameInput, passwordInput))
loginButton.grid(row=2, columnspan=2, pady=10)



root.protocol("WM_DELETE_WINDOW", lambda: exitHandler(root, sio))
root.mainloop()