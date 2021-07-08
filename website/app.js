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
const updateUI = (storedData) => {
    date.innerHTML = storedData.date;
    temp.innerHTML = storedData.temp;
    content.innerHTML = storedData.content;
}

/* Main Functions */
const generateData = () => {
    const newZipCode = document.getElementById('zip').value;
    getWeaterData(baseUrl, newZipCode, apiKey)
        .then((data) => {
            postData('/app-data', data);
        })
        .then(() => {
            getAppData()
                .then((storedData) => {
                    updateUI(storedData);
                });
        });
}

const getWeaterData = async (baseUrl, zipCode, apiKey) => {
    const req = await fetch(baseUrl + zipCode + apiKey);
    try {
        const data = await req.json();
        const newData = {
            date: newDate,
            temp: data.main.temp,
            content: document.getElementById('feelings').value
        }
        return newData
    } catch(err) {
        console.log('error', err);
    }
}

const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    });
    try {
        const newData = await res.json();
        return newData;
    } catch(err) {
        console.log('error', err);
    }
}

const getAppData = async () => {
    const req = await fetch('/app-data');
    try {
        const storedData = await req.json();
        return storedData
    } catch(err) {
        console.log('error', err);
    }
}
/* Event Listeners */
window.addEventListener('load', () => {
    // setup Event Listner to generate data when click on generate button
    generateBtn.addEventListener('click', () => {
        generateData();
    });
});