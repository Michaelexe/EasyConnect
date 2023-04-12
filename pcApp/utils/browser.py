import subprocess

def open_browser(browser='chrome',url='www.google.com'):
        return subprocess.Popen(f'start {browser} {url}',shell = True)

def close_browser(browser):
        return subprocess.Popen(f'taskkill /F /IM {browser}.exe /T', shell=True)
