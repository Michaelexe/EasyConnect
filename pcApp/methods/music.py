from selenium.webdriver.common.by import By
import undetected_chromedriver as uc
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import time
from config import GOOGLE_USERNAME, GOOGLE_PASSWORD


# def get_login_info():

#     info = []
#     f = open('login.txt')

#     for line in f.readlines():
#         info.append(line.strip('\n'))

#     f.close()

#     return info


def play_song(song: str):

    url = 'https://music.youtube.com/'
    options = uc.ChromeOptions()
    driver = uc.Chrome(options=options, use_subprocess=True)
    driver.get(url)
    driver.find_element(by=By.TAG_NAME, value="body").send_keys(Keys.F11)

    # login_info_holder = get_login_info()
    # USERNAME = login_info_holder[0]
    # PASSWORD = login_info_holder[1]

    wait = WebDriverWait(driver, timeout=10)

    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.sign-in-link.ytmusic-nav-bar')))
    driver.find_element(by=By.CSS_SELECTOR, value='.sign-in-link.ytmusic-nav-bar').click()
    time.sleep(3)

    username_field = 'identifier'
    wait.until(EC.presence_of_element_located((By.NAME, username_field)))
    driver.implicitly_wait(7)
    driver.find_element(by=By.NAME, value=username_field).send_keys(GOOGLE_USERNAME)
    driver.find_element(by=By.NAME, value=username_field).send_keys(Keys.ENTER)
    time.sleep(3)

    password_field = 'Passwd'
    wait.until(EC.presence_of_element_located((By.NAME, password_field)))
    driver.implicitly_wait(7)
    time.sleep(2)
    driver.find_element(by=By.NAME, value=password_field).send_keys(GOOGLE_PASSWORD)
    time.sleep(1.5)
    driver.find_element(by=By.NAME, value=password_field).send_keys(Keys.ENTER)
    time.sleep(3)
    
    driver.implicitly_wait(7)
    search_button = 'tp-yt-paper-icon-button.ytmusic-search-box, input.ytmusic-search-box, input.ytmusic-search-box::placeholder'
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, search_button)))
    driver.find_element(by=By.CSS_SELECTOR, value=search_button).click()
    driver.find_element(by=By.CSS_SELECTOR, value='input.ytmusic-search-box').send_keys(song)
    time.sleep(1.5)
    driver.find_element(by=By.CSS_SELECTOR, value='input.ytmusic-search-box').send_keys(Keys.ENTER)
    time.sleep(3)

    option_lst = '//*[@id="contents"]/ytmusic-responsive-list-item-renderer[1]/div[2]/div[1]/yt-formatted-string/a'
    wait.until(EC.presence_of_element_located((By.XPATH, option_lst)))
    driver.find_element(by=By.XPATH, value=option_lst).click()

    timer = driver.find_element(by=By.XPATH, value='/html/body/ytmusic-app/ytmusic-app-layout/div[3]/ytmusic-search-page/ytmusic-tabbed-search-results-renderer/div[2]/ytmusic-section-list-renderer/div[2]/ytmusic-shelf-renderer/div[3]/ytmusic-responsive-list-item-renderer[1]/div[2]/div[3]/yt-formatted-string/span[6]')
    print(timer)
    timer = timer.text.split(':')

    song_choice = '/html/body/ytmusic-app/ytmusic-app-layout/ytmusic-nav-bar/div[1]/a'
    wait.until(EC.presence_of_element_located((By.XPATH, song_choice)))
    driver.find_element(by=By.XPATH, value=song_choice).click()
    time.sleep(float(timer[0]) * 60 + float(timer[1]))

    driver.quit()