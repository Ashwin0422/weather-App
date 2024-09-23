let searchBtn = document.getElementById("searchBtn");
let inputEl = document.getElementById("inputEl");
let cityName = document.getElementById("cityName");
let temperature = document.getElementById("temperature");
let weatherImage = document.getElementById("weatherImage");
let weatherContainer = document.getElementById("weatherContainer");
let tempDescription = document.getElementById("tempDescription");
let humidityEl = document.getElementById("humidityEl");
let windEl = document.getElementById("windEl");
let cardContainer = document.getElementById("card-container");
let spinner = document.getElementById("spinner");





function get_weather_image(jsonData){
    if (jsonData.weather[0].main == "Clouds") {
        weatherImage.src = "clouds.png";
    }
    else if (jsonData.weather[0].main == "Clear"){
        weatherImage.src = "clear.png";
    }
    else if (jsonData.weather[0].main == "Drizzle"){
        weatherImage.src = "drizzle.png";
    }
    else if (jsonData.weather[0].main == "Mist"){
        weatherImage.src = "mist.png";
    }
    else if (jsonData.weather[0].main == "Rain"){
        weatherImage.src = "rain.png";
    }

}

function getWeatherDetails(city){
        let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=9fe1268091ad82cc5040333ce6782133";
        let options = {
            method : "GET",
        };

        fetch(url, options)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            if (jsonData.cod == 404){
                weatherContainer.classList.add("d-none");
                cardContainer.classList.add("d-none");
                alert("Enter a valid city"); 
                spinner.classList.add("d-none");
            }else{
                spinner.classList.add("d-none");
                weatherContainer.classList.remove("d-none");
                cardContainer.classList.remove("d-none");
                cityName.textContent = jsonData.name;
                temperature.textContent = jsonData.main.temp + "°C";
                tempDescription.textContent = jsonData.weather[0].description
                humidityEl.textContent = jsonData.main.humidity + "%";
                windEl.textContent = jsonData.wind.speed + "Km/hr";
                get_weather_image(jsonData)
            }
        });
    
}

searchBtn.addEventListener("click", function(){
    
    
    let inputElValue = inputEl.value;
    let city = inputElValue;

    if (city === ""){
        alert("Enter a city name");
        spinner.classList.add("d-none");

    }
    else {
        weatherContainer.classList.add("d-none");
        cardContainer.classList.add("d-none");
        spinner.classList.remove("d-none");
        getWeatherDetails(city);
    }

    
    
})



