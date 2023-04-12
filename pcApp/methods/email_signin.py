import undetected_chromedriver as uc
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
import time
from config import GOOGLE_USERNAME, GOOGLE_PASSWORD

check = False



def login(sleep: int):
    url = 'https://www.google.com/gmail/about/'
    options = uc.ChromeOptions()
    driver = uc.Chrome(options=options, use_subprocess=True)
    # open the gmail website
    driver.get(url)
    time.sleep(sleep)
  
    # sending the username and password to log-in fields
    driver.find_element(by=By.CSS_SELECTOR, value='.button--medium').click()
    time.sleep(sleep)
    driver.find_element(by=By.NAME, value="identifier").send_keys(GOOGLE_USERNAME)
    time.sleep(sleep)
    driver.find_element(by=By.CSS_SELECTOR, value='.VfPpkd-LgbsSe-OWXEXe-k8QpJ:not(:disabled)').click()
    time.sleep(sleep)
    driver.find_element(by=By.NAME, value='Passwd').send_keys(GOOGLE_PASSWORD)
    time.sleep(sleep)
    driver.find_element(by=By.CSS_SELECTOR, value='.VfPpkd-LgbsSe-OWXEXe-k8QpJ:not(:disabled)').click()
    time.sleep(3)

    global check
    while not check:
        try:
            if driver.title:
                continue
        except:
            check = True
    
    driver.quit()