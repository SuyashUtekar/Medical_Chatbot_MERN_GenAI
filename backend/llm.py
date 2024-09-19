import sys
import os
from gradio_client import Client
import re 
import requests
from bs4 import BeautifulSoup

# Receive arguments from Node.js
arg_from_node = sys.argv[1]
print("", arg_from_node)


def medical(text):
    client = Client("peteparker456/medical_diagnosis_llama2")
    result = client.predict(
		message=text,
		system_message="""
        You are a Medical AI Assistant. Based on the user's symptoms, provide a short, precise response that includes:
        1. The symptoms
        2. A brief explanation of the likely disease
        3. Conclude with 'Disease: [Disease Name]'
        
        If you don't know the answer to a specific medical inquiry, advise seeking professional help.
        """,
		max_tokens=512,
		temperature=0.7,
		top_p=0.95,
		api_name="/chat"
    )
    return result

def extract_disease(r):
    # Extract the disease name using regex
    match = re.search(r'Disease:\s*([^\.\n]+)', r)
    if match:
        return match.group(1).strip()
    return "Unknown"

text = arg_from_node
r = medical(text)
print(r)


# Assuming the result is a string directly containing the response text
response_text = r if isinstance(r, str) else r['data']['response']
disease = extract_disease(response_text)


def scrape_doctors(disease):
    search_query = disease.replace(" ", "+")
    url = f"https://www.practo.com/search/doctors?q={search_query}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    doctors = []
    for doctor in soup.select('.doctor-list-item'):
        name = doctor.select_one('.doctor-name').text.strip()
        address = doctor.select_one('.doctor-address').text.strip()
        email = doctor.select_one('.doctor-email').text.strip() if doctor.select_one('.doctor-email') else 'Not Available'
        doctors.append({
            'name': name,
            'address': address,
            'email': email
        })
    
    return doctors

