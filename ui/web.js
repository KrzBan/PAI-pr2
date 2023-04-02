const city_select = GetWebElement('city_select');
const weather_image = GetWebElement('weather_image');
const weather_text = GetWebElement('weather_text');

window.addEventListener("load", (event) => {
    FetchCities().then(cities=>{
        PopulateCitySelect(cities);
    }).catch(error=>{
        console.log("Error fetching cities!");
    });
});

function CitySelectOnChange(){
    const cityId = city_select.value;
    
    FetchCity(cityId).then(city=>{
        weather_text.innerHTML = WeatherTypeToName(city.weather);
        weather_image.src = `public/${city.weather}.png`;
    }).catch(error=>{
        console.log("Error fetching city!");
    });
}

function PopulateCitySelect(cities){ 
    let select_content = "";
    cities.forEach(city => {
        select_content +=
        `<option value="${city.id}">${city.name}</option>`
    });

    city_select.innerHTML = select_content;
    CitySelectOnChange();
}

async function FetchCities(){
    const response = await fetch("http://localhost:3000/");
    const jsonData = await response.json();

    return jsonData;
}

async function FetchCity(id){
    const response = await fetch(`http://localhost:3000/${id}`);
    const jsonData = await response.json();

    return jsonData;
}

function WeatherTypeToName(weatherType){
    switch(weatherType){
        case "rainy": return "Rainy"; break;
        case "sunny": return "Sunny"; break;
        case "cloudy": return "Cloudy"; break;
        case "zenithal-rains": return "ZenithalRains"; break;
    }

    return "Unknown";
}

function GetWebElement(id){
    const elem = document.getElementById(id);
    if(elem === null){
        throw Error(`Element with id (${id}) not found`);
    }
    return elem;
}