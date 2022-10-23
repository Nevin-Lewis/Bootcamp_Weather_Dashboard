var city_input = document.querySelector("#City");
var InputFormEl = document.querySelector('#InputForm');


var formSubmitHandler = function (event) {
    event.preventDefault();

var city_name = city_input.value.trim();
if (city_name) {
    getLocationRepo(city_name);
   city_input.value = '';
  } else {
    alert('Please enter a City name');
  }
};

var getLocationRepo = function(city_name) {
    var apiURL= 'https://api.openweathermap.org/data/2.5/weather?q=' + city_name + ',USA&appid=393fe9e5d586a9565ac961c89947a415&units=imperial';
fetch(apiURL) 
    .then(function (response) {
        console.log(response)
    response.json().then(function (data) {
        console.log(data);
    });   
})
};
InputFormEl.addEventListener('submit', formSubmitHandler);