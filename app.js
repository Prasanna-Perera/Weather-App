const API_KEY = "f7ee12e0d9ec4b9d948105446261210";

const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".Search-btn");

const weatherInfoSection = document.querySelector(".Weather-info");
const notFoundSection = document.querySelector(".not-found-search-city");
const searchCitySection = document.querySelector(".search-city");

async function getWeather(city = "Colombo") {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=7`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to retrieve weather data.");
    }

    return response.json();
}

function showSection(activeSection) {
    weatherInfoSection.style.display = "none";
    notFoundSection.style.display = "none";
    searchCitySection.style.display = "none";

    activeSection.style.display = "flex";
}

function displayForecast(forecastDays) {
    const container = document.querySelector(".forecast-items-container");
    container.innerHTML = "";

    const hourlyData = forecastDays[0].hour;
    const selectedHours = [9, 12, 15, 18];

    selectedHours.forEach((hour) => {
        const hourItem = hourlyData[hour];
        const time = hourItem.time.split(" ")[1];
        const temp = Math.round(hourItem.temp_c);
        const icon = `https:${hourItem.condition.icon}`;

        container.innerHTML += `
            <div class="forecast-item">
                <h5 class="forecast-item-date regular-text">${time}</h5>
                <img src="${icon}" class="forecast-item-img" alt="${hourItem.condition.text}">
                <h5 class="forecast-item-temp">${temp} °C</h5>
            </div>
        `;
    });
}

function displayWeather(data) {
    const windMs = (data.current.wind_kph / 3.6).toFixed(1);

    document.querySelector(".country-txt").innerText = `${data.location.name}, ${data.location.country}`;
    document.querySelector(".current-date-txt").innerText = data.current.last_updated.split(" ")[0];
    document.querySelector(".temp-txt").innerText = `${Math.round(data.current.temp_c)}°C`;
    document.querySelector(".condition-txt").innerText = data.current.condition.text;
    document.querySelector(".Humidity-value-text").innerText = `${data.current.humidity}%`;
    document.querySelector(".Wind-value-text").innerText = `${windMs} M/s`;
    document.querySelector(".weather-summary-img").src = `https:${data.current.condition.icon}`;

    displayForecast(data.forecast.forecastday);
    showSection(weatherInfoSection);
}

async function loadWeather(city = "Colombo") {
    try {
        const data = await getWeather(city);
        displayWeather(data);
    } catch (error) {
        console.error(error);
        showSection(notFoundSection);
    }
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        loadWeather(city);
        cityInput.value = "";
        cityInput.blur();
    }
});

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const city = cityInput.value.trim();
        if (city !== "") {
            loadWeather(city);
            cityInput.value = "";
            cityInput.blur();
        }
    }
});

//loadWeather();