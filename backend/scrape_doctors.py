import json
import sys
from selenium import webdriver
from bs4 import BeautifulSoup
import time

# Collect command-line arguments (disease and location)
disease = sys.argv[1]
location = sys.argv[2]

# Web scraping logic to extract doctor details (similar to earlier script)
def scrape_doctors(disease, location):
    driver = webdriver.Chrome(executable_path='/path/to/chromedriver')
    practo_url = f"https://www.practo.com/search?q={disease}&city={location}"
    driver.get(practo_url)
    time.sleep(5)
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, 'html.parser')
    
    # Scrape doctor information
    doctors = soup.find_all('div', class_='doctor-card')
    doctor_list = []

    for doctor in doctors:
        name = doctor.find('h2', class_='doctor-name').text.strip()
        specialty = doctor.find('span', class_='specialization').text.strip()
        address = doctor.find('p', class_='address').text.strip()
        rating = doctor.find('span', class_='star-rating').text.strip()
        
        doctor_list.append({
            "name": name,
            "specialty": specialty,
            "address": address,
            "rating": rating
        })

    driver.quit()
    return doctor_list

# Get doctors and print as JSON
doctors = scrape_doctors(disease, location)
print(json.dumps(doctors))  # Output doctor data in JSON format for Node.js to parse