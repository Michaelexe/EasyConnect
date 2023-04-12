from flask import Blueprint, request
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver
from bs4 import BeautifulSoup
from utils import brightness, volume
import socket
import os

verify = Blueprint("verify", __name__)

options = Options()
options.add_experimental_option("detach", True)
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
driver.maximize_window()

# hostname = socket.getfqdn()
hostname = socket.gethostname() if len(socket.gethostname()) < len(socket.getfqdn()) else socket.getfqdn()
# print(hostname)
# print(socket.gethostname())
soup = None
inp = socket.gethostbyname(hostname)

with open(".\static\setup\index.html", 'r') as html:
    soup = BeautifulSoup(html, 'html.parser')
    temp = soup.find(id="ipAddress")

if temp.string is None:
    temp.string = inp
else:
    temp.string.replaceWith(inp)

with open(".\static\setup\index.html", 'w') as html:
    html.write(str(soup))
    
static_path = os.getcwd() + '\static'
driver.get(static_path + "\setup\index.html")

@verify.route("/", methods=["GET"])
def index():
    driver.get(static_path + "\connected\index.html")                  
    return {"volume":volume.get_volume(), "brightness": brightness.get_brightness()[0]}, 200
