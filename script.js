let apikey = "c9421dec344466b6bfdc9cb086f74caf";
let searchCity = document.querySelector(".search");

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const url = location => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;
}

const dateBuilder = d => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}

const changeBackground = descrip => {
    descrip.includes("cloud") ? document.body.style.backgroundImage = "url(images/cloudy.jpg)" :
    descrip.includes("sun") ? document.body.style.backgroundImage = "url(images/sunny1.jpg)" :
    descrip.includes("rain") ? document.body.style.backgroundImage = "url(images/rainy.jpg)" :
    descrip.includes("snow") ? document.body.style.backgroundImage = "url(images/snowy.jpg)" :
    document.body.style.backgroundImage = "url(images/normal.jpg)";
}

const getWeather = location => {
    let locationCity = document.querySelector(".location-city");
    let tempDegree = document.querySelector(".temperature-degree");
    let tempDescrip = document.querySelector(".temperature-descrip");
    let tempMinMax = document.querySelector(".temperature-minmax");
    let humidity = document.querySelector(".humidity");
    let now = new Date();
    let date = document.querySelector(".location-date");

    fetch (url(location))
    .then(response => response.json())
    .then(data => {
        locationCity.textContent = data.name;
        tempDegree.textContent = `${Math.floor(data.main.temp - 273)}°C`;
        tempDescrip.textContent = capitalizeFirstLetter(data.weather[0].description);
        tempMinMax.textContent = `Max ${Math.floor(data.main.temp_max - 273)}°C / Min ${Math.floor(data.main.temp_min - 273)}°C`
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        changeBackground(data.weather[0].description);
        searchCity.value = "";
        date.innerText = dateBuilder(now);
    })
    .catch(err => {
        alert("The city doesn't exist.");
        searchCity.value = "";
        console.log(err);
    })
}

searchCity.addEventListener("keypress", e => {
    if (e.keyCode == 13) getWeather(searchCity.value);
});

getWeather("Buenos Aires");
