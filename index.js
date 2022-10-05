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
    var tempMax = data.main.temp_min - 273.15;
    var tempMin = data.main.temp_max - 273.15;
    var description = data.weather[0].description;
    var idIcon = data.weather[0].icon;
    var iconLink = `http://openweathermap.org/img/wn/${idIcon}@2x.png`;
    document.querySelector('#city').innerHTML = `${data.name}`;
    document.querySelector('#temp').innerHTML = `${Math.round(tempNow)}`;
    document.querySelector('#tempmin').innerHTML = `${Math.round(tempMax)}`;
    document.querySelector('#tempmax').innerHTML = `${Math.round(tempMin)}`;
    document.querySelector('#description').innerHTML = `${description}`;
    document.querySelector('#icon').innerHTML = `<img src="${iconLink}" alt="icon météo" >`;  

    // API FOR POLLUTION
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var pollution = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${clef}`);
    pollution = await pollution.json();
    var no2 = pollution.list[0].components.no2;
    
    if (no2 < 50 ) {
            document.querySelector('#pollution').innerHTML = `Polution : <br> &#128513;`;
        }
        else if (no2 > 50 && no2 < 100){
            document.querySelector('#pollution').innerHTML = `&#128522;`;
        }  
        else if (no2 > 100 && no2 < 200){
            document.querySelector('#pollution').innerHTML = `&#128528;`;
        }
        else if (no2 > 200 && no2 < 400){
            document.querySelector('#pollution').innerHTML = `&#128532;`;
        }
        else if (no2 > 400){
            document.querySelector('#pollution').innerHTML = `&#129314;`;
        }
    console.log(pollution.list[0].components);
}

weather();


// var today = new Date();
// var dd = String(today.getDate()).padStart(2, '0');
// var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// var yyyy = today.getFullYear();

// today = dd + '.' + mm + '.' + yyyy;
// document.write(today);