//I use this app to
// when I type in a city or click a button
// then the current weather info and 5 day forecast is revealed


// fetch current day data from current weather data api

// convert kelvin to fahrenheight

//(K − 273.15) × 9/5 + 32 


var lat = "";
var lon = "";

var cityName = "";

var getData = function(cityName) {
    var card = [];


    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3f3c84db569188d2c7dd0abf10be0fd4`).then(response => response.json()).then(data => {
        console.log(data);
        console.log(data.main.temp);
        temperatureInFahrenheight = (data.main.temp - 273.15) * 9 / 5 + 32
        document.getElementById('temp').textContent = temperatureInFahrenheight;
        document.getElementById('wind').textContent = data.wind.speed;
        document.getElementById('humidity').textContent = data.main.humidity;
        console.log(data.coord.lon);
        lon = data.coord.lon;
        lat = data.coord.lat;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=3f3c84db569188d2c7dd0abf10be0fd4`).then(response => response.json()).then(data2 => {
                console.log(data2)
                document.getElementById('uv').textContent = data2.current.uvi;
                var daily = document.getElementById('fiveDays');

                for (i = 0; i < 5; i++) {
                    card[i] = document.createElement('div');
                    card[i].setAttribute('class', 'card');
                    iToString = i.toString();
                    console.log(typeof(iToString))
                    card[i].setAttribute('id', 'card' + iToString);
                    daily.appendChild(card[i]);
                    var cardById = document.getElementById('card' + iToString);
                    h3 = document.createElement('h3');
                    cardById.appendChild(h3);
                    if (card[i] === 0) {
                        var unixTime = data2.current.dt;
                        var date = new Date(unixTime * 1000);
                        h3.textContent = date.toLocaleDateString("en-US");
                    } else {
                        var unixTime = data2.daily[i].dt;
                        var date = new Date(unixTime * 1000);
                        h3.textContent = date.toLocaleDateString("en-US");

                    }
                }




            }

        ).catch(err => console.error(err));

    }).catch(err => console.error(err));






}







document.getElementById('search').addEventListener('click', function(event) {
    event.preventDefault();

    var cityName = document.getElementById('searchInput').value;
    getData(cityName);

})