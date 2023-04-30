from selenium.webdriver.common.by import By
import undetected_chromedriver as uc
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import time
from config import SPOTIFY_USERNAME, SPOTIFY_PASSWORD


def play_song():

    url = 'https://open.spotify.com/'
    options = uc.ChromeOptions()
    driver = uc.Chrome(options=options, use_subprocess=True)
    driver.get(url)
    driver.find_element(by=By.TAG_NAME, value="body").send_keys(Keys.F11)

    wait = WebDriverWait(driver, timeout=10)

    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.Button-sc-qlcn5g-0.eeDakC')))
    driver.find_element(by=By.CSS_SELECTOR, value='.Button-sc-qlcn5g-0.eeDakC').click()
    
    username_id = "login-username"
    wait.until(EC.presence_of_element_located((By.ID, username_id)))
    driver.implicitly_wait(7)
    driver.find_element(by=By.ID, value=username_id).send_keys(SPOTIFY_USERNAME)
    
    password_id = 'login-password'
    wait.until(EC.presence_of_element_located((By.ID, password_id)))
    driver.implicitly_wait(7)
    driver.find_element(by=By.ID, value=password_id).send_keys(SPOTIFY_PASSWORD)
    driver.find_element(by=By.ID, value=password_id).send_keys(Keys.ENTER)
        
    driver.implicitly_wait(7)
    close_popup = ".onetrust-close-btn-handler.onetrust-close-btn-ui.banner-close-button.ot-close-icon"
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, close_popup)))
    driver.find_element(by=By.CSS_SELECTOR, value=close_popup).click()
    driver.implicitly_wait(7)
    play_button = "/html/body/div[4]/div/div[2]/div[2]/footer/div/div[2]/div/div[1]/button"
    wait.until(EC.element_to_be_clickable((By.XPATH, play_button)))
    driver.find_element(by=By.XPATH, value=play_button).click()
    
    # option_lst = '//*[@id="contents"]/ytmusic-responsive-list-item-renderer[1]/div[2]/div[1]/yt-formatted-string/a'
    # wait.until(EC.presence_of_element_located((By.XPATH, option_lst)))
    # driver.find_element(by=By.XPATH, value=option_lst).click()

    # timer = driver.find_element(by=By.XPATH, value='/html/body/ytmusic-app/ytmusic-app-layout/div[3]/ytmusic-search-page/ytmusic-tabbed-search-results-renderer/div[2]/ytmusic-section-list-renderer/div[2]/ytmusic-shelf-renderer/div[3]/ytmusic-responsive-list-item-renderer[1]/div[2]/div[3]/yt-formatted-string/span[6]')
    # print(timer)
    # timer = timer.text.split(':')

    # song_choice = '/html/body/ytmusic-app/ytmusic-app-layout/ytmusic-nav-bar/div[1]/a'
    # wait.until(EC.presence_of_element_located((By.XPATH, song_choice)))
    # driver.find_element(by=By.XPATH, value=song_choice).click()
    # time.sleep(float(timer[0]) * 60 + float(timer[1]))

    # driver.quit()