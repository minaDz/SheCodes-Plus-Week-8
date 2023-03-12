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

function displayForecast(response){
    console.log(response.data.daily);
    let forecastElement= document.querySelector("#forecast");
    let forecastHtml = `<div class=row>`;
    let days=["Mon","Tue","Wed","Thu","Fri","Sat"];
    days.forEach(function(day){
        forecastHtml = forecastHtml + `
        <div class="col">
        <div class="weather-forecast" id="forecast">
          <div class="weather-forecast-day">${day}</div>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAaxJREFUaN7tmdGNhCAQhi1hS7CELcEGLrGELcESpgRLsAQ7uCvBV98swQ44uIwXzhMYgQE2geR/MZPN/8nv4LiNEKJ5ZzUVoAJUgApQAaICUNe6rh3q2SRcQQDS7ENqktqlhKZNCooGkAZbNCosmkoGWBzmD0FxANLUi2j+kNqtXmpEDepaToD5JgDb7vgCfEUCUBrfHUCpSwKAbRMu2maoZnYAdUAxGD+0swIwm1dx7A3nzLlZzOfuRQVYmMy/MJYDRhPwdaS13LBdh3ACYP/mMA+W03yjPjMUAODIPN557252B2DiyD1GM3QHfyKYegdAe0hj/J6K29MGMETO/YPhINyOnbgCaGP2egbzvx3N1kbHQnJv3d2gkTLXijYTV4AMIyXoB4pvzcfn2kstvjW+8wBo3QSu3ucpNWgOpFyQxhpfAOdoSB0fswBEjtA/cyouKjaUmhCAzjWUU2oM5oS6TqnJ3oWSAVA+g/h8KmEHOGKgjX9gioqtJicAmIaJ88Nqq7nT4y8AjDXZI2SA+gNgq7kDAK4PUJSabAAp1/kcsNXU/8gqQAWoAGXpGzmRTGmgvhAvAAAAAElFTkSuQmCC"
            alt="rainy"
          />
          <div class="weather-forecast-temp">
            <span class="weather-forecast-max">18°</span>
            <span class="weather-forecast-min">12°</span>
          </div>
        </div>
      </div>`
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