let url = window.location.href;
let parse = url.split('=');
let cityName = parse[1];

// var api_lien = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${clef}`


async function weather() {

    // API CALL
    var clef = "23d24718ba6e91358ea2c75bf11f77cc";
    var data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${clef}&lang=fr`);
    data = await data.json();
    console.log(data);
    // Descritpion & Icon
    var tempNow = data.main.temp - 273.15;
    var description = data.weather[0].description;
    var windSpeed = Math.round(data.wind.speed * 3.6);
    var idIcon = data.weather[0].icon;
    var iconLink = `http://openweathermap.org/img/wn/${idIcon}@2x.png`;
    document.querySelector('#city').innerHTML = `${data.name}`;
    document.querySelector('#temp').innerHTML = `${Math.round(tempNow)}`;
    document.querySelector('#description').innerHTML = `${description}`;
    document.querySelector('#vent').innerHTML = `${windSpeed} km/h`;
    document.querySelector('#icon').innerHTML = `<img src="${iconLink}" alt="icon météo" >`;  

    // API FOR POLLUTION
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var pollution = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${clef}`);
    pollution = await pollution.json();
    var indice = pollution.list[0].main.aqi;
    
    switch (indice) {
        case 1:
            document.querySelector('#pollution').innerHTML = `Très bonne &#128513;`;
            break;
        case 2:
            document.querySelector('#pollution').innerHTML = `Bonne &#128522;`;
            break;
        case 3:
            document.querySelector('#pollution').innerHTML = `Moyenne &#128528;`;
            break;   
        case 4:
            document.querySelector('#pollution').innerHTML = `Mauvaise &#128532;`;
            break;  
        case 5:
            document.querySelector('#pollution').innerHTML = `Très mauvaise &#128567;`;
            break;   
        default:
            break;
    }
}

weather();
