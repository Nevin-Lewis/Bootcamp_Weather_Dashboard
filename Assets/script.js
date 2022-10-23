var city_input = document.querySelector("#City");
var InputFormEl = document.querySelector('#InputForm');
var city_textEl = document.querySelector('#City_name');
var temp_textEl = document.querySelector("#weather_report");
var future_textEl = document.querySelector(".card")
var weather_data ={};
var future_data= {};

var formSubmitHandler = function (event) {
    event.preventDefault();

var city_name = city_input.value.trim();
if (city_name) {
    getCurrentweatherRepo(city_name);
    get5dayweatherRepo(city_name);
   city_input.value = '';
  } else {
    alert('Please enter a City name');
  }
};

var getCurrentweatherRepo = function(city_name) {
    var apiURL= 'https://api.openweathermap.org/data/2.5/weather?q=' + city_name + ',USA&appid=393fe9e5d586a9565ac961c89947a415&units=imperial';
fetch(apiURL) 
    .then(function (response) {
        console.log(response)
    response.json().then(function (data) {
        localStorage.setItem("weather_data", JSON.stringify(data));
        });   
        setAttributes();
})

};
var setAttributes = function(){
    weather_data = JSON.parse(localStorage.getItem("weather_data"));
city_textEl.innerHTML = weather_data.name + '('+ moment.unix(weather_data.dt).format("MMM Do, YYYY") + ')';
temp_textEl.children[0].innerHTML = "Temp: " + weather_data.main.temp + " F";
temp_textEl.children[1].innerHTML = "Wind: " + weather_data.wind.speed + " MPH";
temp_textEl.children[2].innerHTML = "Humidity: " + weather_data.main.humidity + " %";

    future_data = JSON.parse(localStorage.getItem("future_data"));
for (let i=0; i<5; i++){
    temp_textEl.children[0].innerHTML = "Temp: " + weather_data.main.temp + " F";
temp_textEl.children[1].innerHTML = "Wind: " + weather_data.wind.speed + " MPH";
temp_textEl.children[2].innerHTML = "Humidity: " + weather_data.main.humidity + " %";

}
}
var get5dayweatherRepo = function(city_name) {
    var apiURL= 'https://api.openweathermap.org/data/2.5/forecast?q=' + city_name + ',USA&appid=393fe9e5d586a9565ac961c89947a415&units=imperial';
fetch(apiURL) 
    .then(function (response) {
        console.log(response)
    response.json().then(function (data) {
        localStorage.setItem("future_data", JSON.stringify(data));
    });   
})
};
InputFormEl.addEventListener('submit', formSubmitHandler);