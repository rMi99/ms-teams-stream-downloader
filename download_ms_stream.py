from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time

chrome_options = Options()
chrome_options.add_argument("--headless")  
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")


chrome_options.binary_location = "/usr/bin/chromium-browser"
driver_path = "/usr/local/bin/chromedriver"

driver = webdriver.Chrome(executable_path=driver_path, options=chrome_options)

driver.get("https://www.microsoftstream.com")


time.sleep(3)

username = driver.find_element(By.ID, "i0116")
username.send_keys("YOUR_EMAIL@domain.com")

next_button = driver.find_element(By.ID, "idSIButton9")
next_button.click()
time.sleep(2)

password = driver.find_element(By.ID, "i0118")
password.send_keys("YOUR_PASSWORD")

signin_button = driver.find_element(By.ID, "idSIButton9")
signin_button.click()

time.sleep(5) 

driver.get("https://web.microsoftstream.com/video/YOUR_VIDEO_ID")

time.sleep(5)

time.sleep(10)

driver.quit()
