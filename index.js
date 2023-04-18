const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/weather",
};

//Keypress event on search box
const searchBox = document.getElementById("search-box");
searchBox.addEventListener("keypress", setQuery);

//Event Handler--keypress
function setQuery(event) {
    if (event.keyCode === 13) {
        getWeatheInfo(searchBox.value);
    }
}

function getWeatheInfo(cityName) {
    fetch(`${api.base}?q=${cityName}&units=metric&appid=${api.key}`)
        .then((response) => {
            return response.json();
        })
        .then((weatherInfo) => {
            console.log(weatherInfo);
            if (weatherInfo.cod === 200) {
                displayResults(weatherInfo);
            } else {
                alert(response.message);
            }
        })
        .catch((err) => console.log(err));
}
getWeatheInfo("delhi");

function displayResults(weatherInfo) {
    let city = document.querySelector(".city");
    city.innerText = `${weatherInfo.name}, ${weatherInfo.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weatherInfo.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weatherInfo.weather[0].main;

    let hilow = document.querySelector(".hi-low");
    hilow.innerText = `${Math.round(weatherInfo.main.temp_min)}°c / ${Math.round(
        weatherInfo.main.temp_max
    )}°c`;

    const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`;
    const weatherIconElement = document.getElementById("weather-icon");
    weatherIconElement.src = weatherIconUrl;
}

function dateBuilder(d) {
    // let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // let day = days[d.getDay()];
    // let date = d.getDate();
    // let month = months[d.getMonth()];
    // let year = d.getFullYear();

    // return `${day}, ${date} ${month} ${year}`;

    const formatOptions = {
        weekday: "long",
        month: "long",
        day: "2-digit",
        year: "numeric",
    };
    return d.toLocaleDateString("en-US", formatOptions);
}
