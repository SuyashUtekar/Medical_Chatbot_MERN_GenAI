import sys
import os
from gradio_client import Client
# Receive arguments from Node.js
arg_from_node = sys.argv[1]
print("Argument received from Node.js:", arg_from_node)



def medical(text):
    client = Client("peteparker456/medical_diagnosis_llama2")
    result = client.predict(
		message=text,
		system_message="""You are Medical AI Assistant. Please be thorough and provide an informative answer. 
    If you don't know the answer to a specific medical inquiry, advise seeking professional help.""",
		max_tokens=512,
		temperature=0.7,
		top_p=0.95,
		api_name="/chat"
    )
    return result

text = arg_from_node
r = medical(text)
print(r)

    