from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
import time

INPUT_XPATH="/html/body/div[1]/div/header/div[2]/div/div/form/div/input[1]"
SEARCH_BTN_XPATH="/html/body/div[1]/div/header/div[2]/div/div/div/form/div/button"


def search(search_term:str):
    search_term = "" if search_term is None else search_term
    url = "https://en.wikipedia.org/wiki/Main_Page"
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(options=options)
    driver.maximize_window()
    driver.get(url)

    print(search_term)
    
    wait = WebDriverWait(driver, 10)
    # wait.until(EC.visibility_of_element_located((By.XPATH, SEARCH_BTN_XPATH)))
    # driver.find_element(by=By.XPATH, value=SEARCH_BTN_XPATH).click()
    wait.until(EC.visibility_of_element_located((By.NAME, "search")))
    time.sleep(2.0)
    driver.find_element(by=By.NAME, value="search").send_keys(search_term)
    time.sleep(2.0)
    driver.find_element(by=By.NAME, value="search").send_keys(Keys.ENTER)
    time.sleep(50000)
    driver.quit()
