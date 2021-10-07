// Global variables
const form = document.querySelector('.app__form');
const icons = document.querySelectorAll('.entry__icon');

// Base URL and API Key for OpenWeatherMap API
const baseURL = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=470a765db3a57bf10f903479bd62d114&units=metric";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Animate the H1 element in the header
let textWrapper = document.querySelector(".ml12");
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
anime.timeline({ loop: true })
    .add({
        targets: ".ml12 .letter",
        translateX: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 500 + 30 * i,
    })
    .add({
        targets: ".ml12 .letter",
        translateX: [0, -30],
        opacity: [1, 0],
        easing: "easeInExpo",
        duration: 1100,
        delay: (el, i) => 100 + 30 * i,
    });

const generateBtn = document.getElementById("generate");
generateBtn.addEventListener("click", performAction);

function performAction(e) {
    e.preventDefault();

    const zipCode = document.getElementById("zip").value;

    if (zipCode !== "") {
        getWeather(baseURL, zipCode, apiKey)
            .then(function (data) {
                postData("/add", {
                    temperature: data.main.temp,
                    date: newDate,
                    city: data.name,
                    description: data.weather[0].description,
                    country: data.sys.country,
                });
            })
            .then(function () {
                updateUI();
            });
        form.reset();
    }
}

// Function to GET Web API Data
const getWeather = async (baseURL, zipCode, apiKey) => {
    const res = await fetch(baseURL + zipCode + apiKey);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

// Function to POST Data
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.error(error);
    }
};

// Update UI demo
const updateUI = async () => {
    const request = await fetch("/all");
    try {
        const allData = await request.json();
        icons.forEach(icon => icon.style.opacity = '1');
        document.getElementById("date").innerHTML = "Date: " + allData.date;
        document.getElementById("temp").innerHTML = "Temperature: " + allData.temperature;
        document.getElementById("city").innerHTML = "City: " + allData.city;
        document.getElementById("weather").innerHTML ="Weather: " + allData.description;
        document.getElementById("country").innerHTML ="Country: " + allData.country;
    } catch (error) {
        console.error(error);
    }
};
