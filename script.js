const api = {
    key: '0844cbef29cfa15d54ff3f5052241c3b',
    baseURL: 'https://api.openweathermap.org/data/2.5/weather?'
}

const input = document.getElementById('city');

//Function to fetch data from API
function fetchData(city) {
    fetch(`${api.baseURL}q=${city}&APPID=${api.key}&units=metric`)
        .then(function(weather) {
            return weather.json();
        }).then(displayWeather);
}

//Function to display data fetched from API
function displayWeather(weather) {
    let cityName = document.getElementById('city-name');
    let cityWeather = document.getElementById('city-weather');
    let cityTemp = document.getElementById('city-temp');
    let background = document.getElementById('bgimg');
    let weatherIcon = document.getElementById('weather-icon');
    let tempIcon = document.getElementById('temp-icon');

    document.getElementById('info').classList.remove('hide');
    cityName.innerText = weather.name + ', ' + weather.sys.country;
    cityWeather.innerText = weather.weather[0].main;
    cityTemp.innerText = Math.ceil(weather.main.temp) + ' °C';
    tempIcon.classList.add('fa-temperature-low');

    if(weather.weather[0].main == 'Clouds') {

        background.style.backgroundImage = 'url("./Images/cloud.jpg")';
        weatherIcon.classList.add('fa-cloud-sun');
        weatherIcon.classList.remove('fa-sun');
        weatherIcon.classList.remove('fa-cloud-rain');
        weatherIcon.classList.remove('fa-smog');

    } else if(weather.weather[0].main == 'Clear') {

        background.style.backgroundImage = 'url("./Images/sun.png")';
        weatherIcon.classList.add('fa-sun');
        weatherIcon.classList.remove('fa-cloud-sun');
        weatherIcon.classList.remove('fa-cloud-rain');
        weatherIcon.classList.remove('fa-smog');

    } else if(weather.weather[0].main == 'Rain' || weather.weather[0].main == 'Drizzle') {

        background.style.backgroundImage = 'url("./Images/rain.png")';
        weatherIcon.classList.add('fa-cloud-rain');
        weatherIcon.classList.remove('fa-sun');
        weatherIcon.classList.remove('fa-cloud-sun');
        weatherIcon.classList.remove('fa-smog');

    } else if(weather.weather[0].main == 'Haze' || weather.weather[0].main == 'Mist') {

        background.style.backgroundImage = 'url("./Images/haze.jpg")';
        weatherIcon.classList.add('fa-smog');
        weatherIcon.classList.remove('fa-sun');
        weatherIcon.classList.remove('fa-cloud-rain');
        weatherIcon.classList.remove('fa-cloud-sun');

    }
}

//Listening on pressing ENTER key
input.addEventListener('keyup', function(event) {
    
    if(event.keyCode == 13) {
        fetchData(input.value);
    }

});