const apiKey = "416d2abd98908efcd62ad65cc85ce55e";
let userFormEl = $("#user-form");
let citySearchEl = $('#city-search');
let todaysWeatherEl = $('#todays-weather');
let fiveDayHeaderEl = $('#five-day');
let cardOneEl = $('#card-one');
let cardTwoEl = $('#card-two');
let cardThreeEl = $('#card-three');
let cardFourEl = $('#card-four');
let cardFiveEl = $('#card-five');
let searchSectionEl = $('#search-section')
let cityName = ''

function searchHandler(event) {
    event.preventDefault();
    nameSearch();
};

function nameSearch() {
    cityName = citySearchEl.val().toLowerCase().replace(/\s/g, '+');
    updateWeather();
}

function nameHistory(event) {
    let element = event.target
    if (element.classList.value === 'btn btn-secondary col-12') {
        let buttonName = element.getAttribute("id")
        cityName = buttonName;
        updateWeather();
    }
}

function updateWeather() {
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=imperial&appid="+apiKey;

    fetch(apiUrl)
        .then(function(responce) {
            if (responce.ok) {
                responce.json().then(function(data) {
                    console.log(data)
                    let displayName = data.name;
                    // crate search history button
                    if ($("#"+displayName).length) {
                    } else {
                        let historyButton = $('<button></button>', {type: 'button', class: 'btn btn-secondary col-12', id: displayName});
                        historyButton.text(displayName);
                        searchSectionEl.append(historyButton);
                    }
                    // display first line of crrent weather (City Name, Date, and Weather Icon)
                    let weatherIconCode = data.weather[0].icon;
                    let weatherIconLink = "http://openweathermap.org/img/w/" + weatherIconCode + ".png";
                    let weatherIconEl = $('<img />', {src: weatherIconLink, alt: 'Weather icon'});
                    let displayNameEl = $("<h2 id='city-name'></h2>").text(displayName);
                    let currentDate = moment().format("  (L)  ");
                    let currentDateEl = $("<span id='date'></span>").text(currentDate);
                    todaysWeatherEl.empty();
                    todaysWeatherEl.addClass('current-style')
                    todaysWeatherEl.append(displayNameEl);
                    $("#city-name").append(currentDateEl, weatherIconEl);
                    // display 2nd line (Current Temp.)
                    let currentTemp = data.main.temp;
                    let currentTempEl = $("<div></div>").text("Temp: "+currentTemp+"°F");
                    todaysWeatherEl.append(currentTempEl);
                    // display 3rd line (wind speed)
                    let windSpeed = data.wind.speed;
                    let windSpeedEl = $("<div></div>").text("Wind: "+windSpeed+" MPH");
                    todaysWeatherEl.append(windSpeedEl);
                    // display 4th line (humidity %)
                    let humidity = data.main.humidity;
                    let humidityEl = $("<div></div>").text("Humidity: "+humidity+"%");
                    todaysWeatherEl.append(humidityEl);
                    // set up coordinates for lon and lat.
                    let lonLoc = data.coord.lon;
                    let latLoc = data.coord.lat;
                    let fiveDayUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+latLoc+"&lon="+lonLoc+"&units=imperial&exclude=minutely,hourly,alerts&appid="+apiKey
                    fetch(fiveDayUrl)
                        .then(function(responcetwo) {
                            if (responcetwo.ok) {
                                responcetwo.json().then(function(dataTwo) {
                                    console.log(dataTwo)
                                    // add uv index to current section
                                    let uvIndex = dataTwo.current.uvi
                                    let uvColor = "";
                                    if (uvIndex < 3) {
                                        uvColor = "bg-success p-1"
                                    } else if (uvIndex < 8) {
                                        uvColor = "bg-warning p-1"
                                    } else {
                                        uvColor = "bg-danger p-1"
                                    }
                                    let uvIndexinnerEl = $("<span></span>").text(uvIndex).addClass(uvColor);
                                    let uvIndexEl = $("<div></div>").text("UV Index: ");
                                    uvIndexEl.append(uvIndexinnerEl);
                                    todaysWeatherEl.append(uvIndexEl);
                                    // Make 5 day forcast cards
                                    fiveDayHeaderEl.text("5-Day Forcast:")
                                    // card one
                                    cardOneEl.empty().addClass("p-2");
                                    // date
                                    let oneDate = moment().add(1, 'days').format("L");
                                    let oneDateEl = $("<h5></h5>").text(oneDate);
                                    cardOneEl.append(oneDateEl);
                                    // icon
                                    let oneIconCode = dataTwo.daily[1].weather[0].icon
                                    let oneIconLink = "http://openweathermap.org/img/w/" + oneIconCode + ".png";
                                    let oneIconEl = $('<img />', {src: oneIconLink, alt: 'Weather icon'});
                                    cardOneEl.append(oneIconEl);
                                    // temp
                                    let oneTemp = dataTwo.daily[1].temp.day;
                                    let oneTempEl = $("<div></div>").text("Temp: "+oneTemp+"°F");
                                    cardOneEl.append(oneTempEl);
                                    // wind
                                    let oneSpeed = dataTwo.daily[1].wind_speed;
                                    let oneSpeedEl = $("<div></div>").text("Wind: "+oneSpeed+" MPH");
                                    cardOneEl.append(oneSpeedEl);
                                    // humidity
                                    let oneHumidity = dataTwo.daily[1].humidity;
                                    let oneHumidityEl = $("<div></div>").text("Humidity: "+oneHumidity+"%");
                                    cardOneEl.append(oneHumidityEl);
                                    // card two
                                    cardTwoEl.empty().addClass("p-2");
                                    // date
                                    let twoDate = moment().add(2, 'days').format("L");
                                    let twoDateEl = $("<h5></h5>").text(twoDate);
                                    cardTwoEl.append(twoDateEl);
                                    // icon
                                    let twoIconCode = dataTwo.daily[2].weather[0].icon
                                    let twoIconLink = "http://openweathermap.org/img/w/" + twoIconCode + ".png";
                                    let twoIconEl = $('<img />', {src: twoIconLink, alt: 'Weather icon'});
                                    cardTwoEl.append(twoIconEl);
                                    // temp
                                    let twoTemp = dataTwo.daily[2].temp.day;
                                    let twoTempEl = $("<div></div>").text("Temp: "+twoTemp+"°F");
                                    cardTwoEl.append(twoTempEl);
                                    // wind
                                    let twoSpeed = dataTwo.daily[2].wind_speed;
                                    let twoSpeedEl = $("<div></div>").text("Wind: "+twoSpeed+" MPH");
                                    cardTwoEl.append(twoSpeedEl);
                                    // humidity
                                    let twoHumidity = dataTwo.daily[2].humidity;
                                    let twoHumidityEl = $("<div></div>").text("Humidity: "+twoHumidity+"%");
                                    cardTwoEl.append(twoHumidityEl);
                                    // card three
                                    cardThreeEl.empty().addClass("p-2");
                                    // date
                                    let threeDate = moment().add(3, 'days').format("L");
                                    let threeDateEl = $("<h5></h5>").text(threeDate);
                                    cardThreeEl.append(threeDateEl);
                                    // icon
                                    let threeIconCode = dataTwo.daily[3].weather[0].icon
                                    let threeIconLink = "http://openweathermap.org/img/w/" + threeIconCode + ".png";
                                    let threeIconEl = $('<img />', {src: threeIconLink, alt: 'Weather icon'});
                                    cardThreeEl.append(threeIconEl);
                                    // temp
                                    let threeTemp = dataTwo.daily[3].temp.day;
                                    let threeTempEl = $("<div></div>").text("Temp: "+threeTemp+"°F");
                                    cardThreeEl.append(threeTempEl);
                                    // wind
                                    let threeSpeed = dataTwo.daily[3].wind_speed;
                                    let threeSpeedEl = $("<div></div>").text("Wind: "+threeSpeed+" MPH");
                                    cardThreeEl.append(threeSpeedEl);
                                    // humidity
                                    let threeHumidity = dataTwo.daily[3].humidity;
                                    let threeHumidityEl = $("<div></div>").text("Humidity: "+threeHumidity+"%");
                                    cardThreeEl.append(threeHumidityEl);
                                    // card four
                                    cardFourEl.empty().addClass("p-2");
                                    // date
                                    let fourDate = moment().add(4, 'days').format("L");
                                    let fourDateEl = $("<h5></h5>").text(fourDate);
                                    cardFourEl.append(fourDateEl);
                                    // icon
                                    let fourIconCode = dataTwo.daily[4].weather[0].icon
                                    let fourIconLink = "http://openweathermap.org/img/w/" + fourIconCode + ".png";
                                    let fourIconEl = $('<img />', {src: fourIconLink, alt: 'Weather icon'});
                                    cardFourEl.append(fourIconEl);
                                    // temp
                                    let fourTemp = dataTwo.daily[4].temp.day;
                                    let fourTempEl = $("<div></div>").text("Temp: "+fourTemp+"°F");
                                    cardFourEl.append(fourTempEl);
                                    // wind
                                    let fourSpeed = dataTwo.daily[4].wind_speed;
                                    let fourSpeedEl = $("<div></div>").text("Wind: "+fourSpeed+" MPH");
                                    cardFourEl.append(fourSpeedEl);
                                    // humidity
                                    let fourHumidity = dataTwo.daily[4].humidity;
                                    let fourHumidityEl = $("<div></div>").text("Humidity: "+fourHumidity+"%");
                                    cardFourEl.append(fourHumidityEl);
                                    // card five
                                    cardFiveEl.empty().addClass("p-2");
                                    // date
                                    let fiveDate = moment().add(5, 'days').format("L");
                                    let fiveDateEl = $("<h5></h5>").text(fiveDate);
                                    cardFiveEl.append(fiveDateEl);
                                    // icon
                                    let fiveIconCode = dataTwo.daily[5].weather[0].icon
                                    let fiveIconLink = "http://openweathermap.org/img/w/" + fiveIconCode + ".png";
                                    let fiveIconEl = $('<img />', {src: fiveIconLink, alt: 'Weather icon'});
                                    cardFiveEl.append(fiveIconEl);
                                    // temp
                                    let fiveTemp = dataTwo.daily[5].temp.day;
                                    let fiveTempEl = $("<div></div>").text("Temp: "+fiveTemp+"°F");
                                    cardFiveEl.append(fiveTempEl);
                                    // wind
                                    let fiveSpeed = dataTwo.daily[5].wind_speed;
                                    let fiveSpeedEl = $("<div></div>").text("Wind: "+fiveSpeed+" MPH");
                                    cardFiveEl.append(fiveSpeedEl);
                                    // humidity
                                    let fiveHumidity = dataTwo.daily[5].humidity;
                                    let fiveHumidityEl = $("<div></div>").text("Humidity: "+fiveHumidity+"%");
                                    cardFiveEl.append(fiveHumidityEl);
                                })
                            }
                        })
                });
            } else {
                alert("Error: City not found.")
            }
        })
        .catch(function(error) {
            alert("Error: Could not connect to saerver.")
        });
};

// event for serch-submit
$("#user-form").submit(searchHandler);
// event for click on history
document.addEventListener("click", nameHistory);