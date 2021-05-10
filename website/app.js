/* Global Variables */

// const { json } = require("body-parser");
// const { application } = require("express");
// const database = require("mime-db");
// const { type } = require("node:os");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//Please note that this API works by default in USA only if(country code is not given)
//API key and weather map website url
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const APIKey = 'a23cc3c4333464598d7bc3bb6b8eda58';


//update website with data recieved from API

const updateWebsite = async (temp, name) => {

    try {
        const postResponse = await fetch('weather/saveData', {
            method: "POST", 
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                temp,
                name,
                date: newDate,
                feelings: document.getElementById('feelings').value
            })
        });

        const getResponse = await fetch('weather');
        const weather = await getResponse.json();

        //sending the data to HTML {date, user input (feelings), and weather data from API}
        document.getElementById('date').innerHTML = `Today is ${weather.date}.`;
        document.getElementById('content').innerHTML = `you are feeling ${weather.feelings} today.\nCity: ${weather.name}`;
        document.getElementById('temp').innerHTML = `The temperature today is ${weather.temp} degrees.`

    } catch (err) {
        console.error("post failed", err)
    }

    
}

// get weather data function for getting data from API according to given data (zipcode)
const getWeatherData = async (zip) => {
    
    try
    {
        const res = await fetch(`${baseURL}?zip=${zip}&appid=${APIKey}&units=metric`);
        return res.json();

    } catch (err) {
        console.error("failed to get weather data from API, error: ", err);
    }



    return null;
};

// generate button function {click event call function}
function btnClick() {
    
    const zip = document.getElementById('zip').value;


    getWeatherData(zip)
        .then(weatherData => {
            console.log(weatherData ); //for debugging
            updateWebsite(weatherData.main.temp, weatherData.name);
        });

}

//listen for 'Generate button' on event click
document.getElementById('generate').addEventListener('click', btnClick)