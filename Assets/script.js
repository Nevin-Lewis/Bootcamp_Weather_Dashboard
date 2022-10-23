var city_input = document.querySelector("#City");
var InputFormEl = document.querySelector('#InputForm');
var city_textEl = document.querySelector('#City_name');
var temp_textEl = document.querySelector("#weather_report");
var future_textEl = document.querySelector(".card-deck")
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
  };

};

var getCurrentweatherRepo = function(city_name) {
    var apiURL= 'https://api.openweathermap.org/data/2.5/weather?q=' + city_name + ',USA&appid=393fe9e5d586a9565ac961c89947a415&units=imperial';
fetch(apiURL) 
    .then(function (response) {
        console.log(response)
    response.json().then(function (data) {
        localStorage.setItem("weather_data", JSON.stringify(data));
        setAttributes()
        });   

})

};
var setAttributes = function(event){
weather_data = JSON.parse(localStorage.getItem("weather_data"));
city_textEl.innerHTML = weather_data.name + '('+ moment.unix(weather_data.dt).format("MMM Do, YYYY") + ')';
temp_textEl.children[0].innerHTML = "Temp: " + weather_data.main.temp + " F";
temp_textEl.children[1].innerHTML = "Wind: " + weather_data.wind.speed + " MPH";
temp_textEl.children[2].innerHTML = "Humidity: " + weather_data.main.humidity + " %";}

var setFuture = function(event){
future_data = JSON.parse(localStorage.getItem("future_data"));
for (let i = 0; i < 5; i++){
future_textEl.children[i].children[0].children[0].innerHTML = moment.unix(future_data.list[i*6+6].dt).format("MMM Do, YYYY");
future_textEl.children[i].children[0].children[2].innerHTML = "Temp: " + future_data.list[i*6+6].main.temp + " F";
future_textEl.children[i].children[0].children[3].innerHTML = "Wind: " + future_data.list[i*6+6].wind.speed + " MPH";
future_textEl.children[i].children[0].children[4].innerHTML = "Humidity: " + future_data.list[i*6+6].main.humidity + " %";

};
}
var get5dayweatherRepo = function(city_name) {
    var apiURL= 'https://api.openweathermap.org/data/2.5/forecast?q=' + city_name + ',USA&appid=393fe9e5d586a9565ac961c89947a415&units=imperial';
fetch(apiURL) 
    .then(function (response) {
        console.log(response)
    response.json().then(function (data) {
        localStorage.setItem("future_data", JSON.stringify(data));
        setFuture();
    });   
})
};

var init = function(){
    future_data = JSON.parse(localStorage.getItem("future_data"));
    if (future_data !== null) {
        setFuture();
        setAttributes();
    }
};
 init();
InputFormEl.addEventListener('submit', formSubmitHandler);