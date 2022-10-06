let url = window.location.href;
let parse = url.split('=');
let cityName = parse[1];

// Données météo ville 
var clef = "23d24718ba6e91358ea2c75bf11f77cc";
const object = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${clef}&lang=fr`)
  .then((response) => response.json())
  .then((data) => {
      return data;
    });


const weather = () => {
    object.then((data) =>{
        // Descritpion & Icon
        console.log(data);
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

    });
}


// Récupere les données concernant la qualité de l'air et l'affiche
const air = () => {
  object.then(async  (data) => {
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        var pollution = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${clef}`);
        pollution = await pollution.json();
        var indice = pollution.list[0].main.aqi;
        switch (indice) {
            case 1:
                document.querySelector('#pollution').innerHTML = `Très bonne`;
                break;
            case 2:
                document.querySelector('#pollution').innerHTML = `Bonne`;
                break;
            case 3:
                document.querySelector('#pollution').innerHTML = `Moyenne`;
                break;   
            case 4:
                document.querySelector('#pollution').innerHTML = `Mauvaise`;
                break;  
            case 5:
                document.querySelector('#pollution').innerHTML = `Très mauvaise`;
                break;   
            default:
                break;
        }
    });
};
                    
weather();
air();
                    