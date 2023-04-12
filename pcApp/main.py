import tkinter as tk
import tkinter.font as tkfont
from PIL import Image, ImageTk

root = tk.Tk()
root.configure(background="#333333")
root.title("EasyConnect")
root.geometry("800x450")


#login scene
labelFont = tkfont.Font(size=16)
logoFrame = tk.Frame(root)
logoFrame.pack(pady=20)

logo = Image.open("./assets/logo.png")
resized_logo = ImageTk.PhotoImage(logo.resize((333, 103)))
logoLabel = tk.Label(logoFrame, image=resized_logo, bg="#333333")
logoLabel.pack(anchor="center")

inputFrame = tk.Frame(root, bg="#333333")
inputFrame.pack(pady=20)

usernameLabel = tk.Label(inputFrame,text="Username: ", bg="#333333", fg="white",font=labelFont)
usernameLabel.grid(row=0, column=0, pady=5)
usernameInput = tk.Entry(inputFrame, width=30, font=labelFont)
usernameInput.grid(row = 0, column = 1, pady = 10, ipady=5)

passwordLabel = tk.Label(inputFrame,text="Password: ", bg="#333333", fg="white",font=labelFont)
passwordLabel.grid(row=1, column=0, pady=5)
passwordInput = tk.Entry(inputFrame, width=30, font=labelFont)
passwordInput.grid(row=1, column=1, pady=10, ipady=5)

loginButton = tk.Button(inputFrame, text = "Login", bg = "Grey", fg = "Black", width=15, font=labelFont)
loginButton.bind("<Button-1>")
loginButton.grid(row=2, columnspan=2, pady=10)

tk.mainloop()