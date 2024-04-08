"use strict";
const KEY = "8d404ae71109f987aa4f386dd9acbb46";

const weatherInfo = document.getElementById("weatherInfo");
const btnClick = document.querySelector(".btn--click");

const getWeather = function (key, city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const weather = {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
      };
      // Display weather information
      weatherInfo.innerHTML = `
        <h2>Weather in ${weather.city}:</h2>
        <p>Temperature: ${weather.temperature}</p>
        <p>Description: ${weather.description}</p>
        <p>Humidity: ${weather.humidity}</p>

        `;
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
};

const renderSpinner = function () {
  const markup = `
          <div class="spinner">
          <svg>
          <use href="/img/icons.svg#icon-loader"></use>
        </svg>
                </div> 
          `;

  weatherInfo.insertAdjacentHTML("afterbegin", markup);
};

const handler = function () {
  const city = document.getElementById("cityInput").value;
  getWeather(KEY, city);
  document.getElementById("cityInput").value = "";
  renderSpinner();
};

btnClick.addEventListener("click", handler);
