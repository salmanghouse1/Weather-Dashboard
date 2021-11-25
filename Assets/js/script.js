//I use this app to
// when I type in a city or click a button
// then the current weather info and 5 day forecast is revealed


// fetch geocode data from google maps api, it will convert input city to lat and lon
// assign the variables to lat and long, es6 wll pass in the lat and long to the next api openweather map call, get the results and display it
// time variable will get the current time through date object

var lat = "";
var lon = "";
const moment = require(moment);

var apiURLOne = fetch(`https: //api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&appid=3f3c84db569188d2c7dd0abf10be0fd4`).then(




)