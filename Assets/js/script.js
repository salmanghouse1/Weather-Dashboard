//I use this app to
// when I type in a city or click a button
// then the current weather info and 5 day forecast is revealed

temperatureInFahrenheightFiveDay = [];
// fetch current day data from current weather data api

// convert kelvin to fahrenheight

//(K − 273.15) × 9/5 + 32 


var lat = "";
var lon = "";

var cityName = "";
var img = [];

// if there is a saved City


if (localStorage.getItem("cityName") === null) {

} else {
    var cityNameSaved = localStorage.getItem("cityName");
    var button = document.createElement('button');
    button.setAttribute('data-city', cityNameSaved);
    button.setAttribute('class', 'optionButton');
    button.setAttribute('id', cityNameSaved);
    document.getElementById('cityButtons').appendChild(button);
    document.getElementById(cityNameSaved).textContent = cityNameSaved;

}



var getData = function(cityName) {






    if (document.getElementById('fiveDays')) {
        document.getElementById('fiveDays').remove();
    }

    if (document.getElementById('todaysDatas')) {
        document.getElementById('todaysDatas').remove();

    }

    var card = [];

    var unixTime = [];
    // create todays data div and append then add text content
    var todaysData = document.createElement('div');


    todaysData.setAttribute('id', 'todaysDatas');


    todaysData.setAttribute('class', 'todays-datas');

    document.getElementById('right').appendChild(todaysData);
    // heading

    var todaysDataCityHeading = document.createElement('h2');

    todaysDataCityHeading.setAttribute('id', 'cityName');

    document.getElementById('todaysDatas').appendChild(todaysDataCityHeading);




    // Temp

    var todaysDataTemp = document.createElement('p');

    todaysDataTemp.setAttribute('id', 'temp');

    document.getElementById('todaysDatas').appendChild(todaysDataTemp);


    // wind


    var todaysDataWind = document.createElement('p');

    todaysDataWind.setAttribute('id', 'wind');

    document.getElementById('todaysDatas').appendChild(todaysDataWind);

    // humidity

    var todaysDataHumidity = document.createElement('p');

    todaysDataHumidity.setAttribute('id', 'humidity');

    document.getElementById('todaysDatas').appendChild(todaysDataHumidity);

    // uv holder for green div

    var todaysDataUV = document.createElement('div');

    todaysDataUV.setAttribute('id', 'uvHolder');

    document.getElementById('todaysDatas').appendChild(todaysDataUV);

    // clear out previous data






    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3f3c84db569188d2c7dd0abf10be0fd4`).then(response => response.json()).then(data => {



        if (cityName === data.name) {
            // if city is right and exists add the city to the history
            var button = document.createElement('button');
            button.setAttribute('data-city', cityName);
            button.setAttribute('class', 'optionButton');
            button.setAttribute('id', cityName);
            document.getElementById('cityButtons').appendChild(button);
            document.getElementById(cityName).textContent = cityName;
            window.localStorage.setItem('cityName', cityName);

            // save the city to local storage and load it next time

        } else {
            // if input is not a valid city
            alert('Not A Valid City');
        }


        temperatureInFahrenheight = (data.main.temp - 273.15) * 9 / 5 + 32

        // Todays Data
        document.getElementById('cityName').textContent = data.name;


        document.getElementById('temp').textContent = 'Temp: ' + Math.round(temperatureInFahrenheight) + "°F";
        document.getElementById('wind').textContent = 'Wind Speed: ' + data.wind.speed;
        document.getElementById('humidity').textContent = 'Humidity: ' + data.main.humidity;
        document.getElementById('uvHolder').textContent = 'UV: ';


        lon = data.coord.lon;
        lat = data.coord.lat;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=3f3c84db569188d2c7dd0abf10be0fd4`).then(response => response.json()).then(data2 => {


                // uv green div

                var divUV = document.createElement('div');

                divUV.setAttribute('id', 'uv');
                // use if condition to add classes to uv

                if (data2.current.uvi <= 2.99) {
                    divUV.setAttribute('class', 'uv-low');
                } else
                if (data2.current.uvi >= 3 && data2.current.uvi <= 7.99) {
                    divUV.setAttribute('class', 'uv-med');

                } else if (data2.current.uvi > 8) {
                    divUV.setAttribute('class', 'uv-high');

                }
                document.getElementById('uvHolder').appendChild(divUV);



                document.getElementById('uv').textContent = data2.current.uvi;

                // create 5 daily forecast div holder
                var fivedays = document.createElement('div');

                fivedays.setAttribute('id', 'fiveDays');

                fivedays.setAttribute('class', 'cards');

                document.getElementById('right').appendChild(fivedays);



                var daily = document.getElementById('fiveDays');

                for (var i = 0; i < 5; i++) {
                    // create a div and asign class card
                    card[i] = document.createElement('div');
                    card[i].setAttribute('class', 'card');
                    // get the string of ; iterator
                    iToString = i.toString();

                    // create an id with card and iterator as id
                    card[i].setAttribute('id', 'card' + i);
                    // append the card
                    daily.appendChild(card[i]);
                    var cardById = document.getElementById('card' + i);
                    // create card child elements
                    h3 = document.createElement('h3');
                    p1 = document.createElement('p');
                    // append the p tags
                    p2 = document.createElement('p');
                    p3 = document.createElement('p');
                    // create img
                    img = document.createElement('img');
                    img.setAttribute('id', 'imageWeatherIcon' + i);
                    cardById.appendChild(img);

                    cardById.appendChild(h3);
                    cardById.appendChild(img);
                    cardById.appendChild(p1);
                    cardById.appendChild(p2);
                    cardById.appendChild(p3);

                    console.log(data2.daily);

                    var avgTemp = (data2.daily[i].temp.min + data2.daily[i].temp.max) / 2;
                    temperatureInFahrenheightFiveDay[i] = (avgTemp - 273.15) * 9 / 5 + 32;

                    p1.textContent = 'Temp ' + Math.round(temperatureInFahrenheightFiveDay[i]) + '°F';

                    p2.textContent = 'Humidity ' + data2.daily[i].humidity + '%';

                    p3.textContent = 'Wind ' + data2.daily[i].wind_speed + 'MPH';
                    // // append the humidity temp and wind
                    // p1.textContent = data2.daily[i].wind;

                    if (i === 0) {
                        // todays data


                        unixTime[i] = data2.current.dt;
                        var date = new Date(unixTime[i] * 1000);
                        // add to top div cityName date
                        document.getElementById('cityName').textContent += " " +
                            date.toLocaleDateString("en-US");;
                        h3.textContent = date.toLocaleDateString("en-US");
                        document.getElementById('imageWeatherIcon' + i).src = 'https://openweathermap.org/img/wn/' +
                            data2.daily[0].weather[0].icon + '.png';
                    }
                    if (i > 0) {
                        // five day data

                        unixTime[i] = data2.daily[i].dt;

                        var date = new Date(unixTime[i] * 1000);
                        h3.textContent = date.toLocaleDateString("en-US");
                        document.getElementById('imageWeatherIcon' + i).src = 'https://openweathermap.org/img/wn/' +
                            data2.daily[i].weather[0].icon + '.png';
                    }
                }




            }

        ).catch(err => console.error(err))

    }).catch(err => console.error(err));






}





var searchForm = document.querySelector('#searchForm');

var cityButtonsId = document.querySelector('#cityButtons');

cityButtonsId.addEventListener('click', function(event) {
    if (event.target.matches('button')) {


        var cityName = document.getElementById('searchInput').value = event.target.getAttribute('data-city');;

        getData(cityName)


    }

})


searchForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var cityName = document.getElementById('searchInput').value;
    getData(cityName);

})