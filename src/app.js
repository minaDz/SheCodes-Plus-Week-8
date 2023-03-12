function displayDate(time){
    let date = new Date(time);
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day= days[date.getDay()];
    let hour= date.getHours();
    let minute= date.getMinutes();
    return `${day} ${hour}:${minute}`;
}

function getForecast(coordinates){
    let apiKey="618babd8a78c104b6a8d38473t84aefo";
    let apiUrl=`https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
    axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response){
    let temperature= document.querySelector("#temperature");
    let humidity= document.querySelector("#humidity");
    let wind= document.querySelector("#wind");
    let city= document.querySelector("#city");
    let country= document.querySelector("#country");
    let description= document.querySelector("#description");
    let date= document.querySelector("#date");
    let icon= document.querySelector("#icon");
    temperature.innerHTML= Math.round(response.data.temperature.current);
    humidity.innerHTML= response.data.temperature.humidity;
    wind.innerHTML= Math.round(response.data.wind.speed);
    city.innerHTML= response.data.city;
    country.innerHTML= response.data.country;
    description.innerHTML= response.data.condition.description;
    date.innerHTML= displayDate(response.data.time*1000);
    icon.setAttribute("src",response.data.condition.icon_url);
    icon.setAttribute("alt",response.data.condition.description);
    celciusTemperature =response.data.temperature.current;
    getForecast(response.data.coordinates);
}

function search(city){
let apiKey= "618babd8a78c104b6a8d38473t84aefo";
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
axios.get(apiUrl).then(displayTemperature);

}

function handelSubmit(event){
    event.preventDefault();
    let input = document.querySelector("#city-input");
    search(input.value);
}

function displayFahrenheit(event){
    event.preventDefault();
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = Math.round((celciusTemperature*9)/5+32);
}

function displayCelsius(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML=Math.round(celciusTemperature);
}

function formatDay(timestamp){
    let date = new Date(timestamp*1000);
    let day = date.getDay();
    let days=["Sun","Mon","Tues","Wed","Thu","Fri","Sat"];
    return days[day];
}
function displayForecast(response){
    let forecast=response.data.daily;
    let forecastElement= document.querySelector("#forecast");
    let forecastHtml = `<div class=row>`;
    
    forecast.forEach(function(forecastday,index){
        if (index !== 0 ){
        forecastHtml = forecastHtml + `
        <div class="col-2" >
        <div class="weather-forecast" id="forecast">
          <div class="weather-forecast-day">${formatDay(forecastday.time)}</div>
          <img
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastday.condition.icon}.png"
            alt="rainy"
            id="forecast-img"
          />
          <div class="weather-forecast-temp">
            <span class="weather-forecast-max">${Math.round(forecastday.temperature.maximum)}°</span>
            <span class="weather-forecast-min">${Math.round(forecastday.temperature.minimum)}°</span>
          </div>
        </div>
      </div>`
    }
    });
    forecastHtml =forecastHtml+ `</div>`;
    forecastElement.innerHTML=forecastHtml;

}


let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit",handelSubmit);

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click",displayFahrenheit);

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click",displayCelsius);

search("Bushehr");