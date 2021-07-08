/* Global Variables */
const
    baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=',
    apiKey = '&appid=8a0ff98723c3f28856581b88cdd91bf0',
    date = document.getElementById('date'),
    temp = document.getElementById('temp'),
    content = document.getElementById('content'),
    generateBtn = document.getElementById('generate');

// Create a new date instance dynamically with JS
    d = new Date();
    newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    
/* helper functions */

/* Main Functions */
const generateData = () => {
    const newZipCode = document.getElementById('zip').value;
    getWeaterData(baseUrl, newZipCode, apiKey);
}

const getWeaterData = async (baseUrl, zipCode, apiKey) => {
    const request = await fetch(baseUrl + zipCode + apiKey);
    try {
        const data = await request.json();
        console.log(data);
        // return data;
    } catch(err) {
        console.log('error', err);
    }
}
/* Event Listeners */
window.addEventListener('load', () => {
    console.log(generateBtn);
    // setup Event Listner to generate data when click on generate button
    generateBtn.addEventListener('click', () => {
        generateData();
    });
});