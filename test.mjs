import { Client } from "@gradio/client";
const client = await Client.connect('peteparker456/medical_diagnosis_llama2');
const result = await client.predict("/chat", { 		
    message: `I'm a 35-year-old male and for the past few months, I've been experiencing fatigue, 
            increased sensitivity to cold, and dry, itchy skin. 
            Could these symptoms be related to hypothyroidism? 
            If so, what steps should I take to get a proper diagnosis and discuss treatment options?`, 		
    system_message: 'You are Medical AI Assistant. Please be thorough and provide an informative answer. If you don\'t know the answer to a specific medical inquiry, advise seeking professional help.', 		
    max_tokens: 1, 		
    temperature: 0.1, 		
    top_p: 0.1, 
});

console.log(result.data)