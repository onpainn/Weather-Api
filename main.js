const apiKey = 'cc1588bbd73444a8ba991712242709';





const header = document.querySelector('.header');
const form =document.querySelector('#form');
const input = document.querySelector('#inputCity');

function removeCard(){
    const prevCard=  document.querySelector('.card');
    if(prevCard) prevCard.remove();
}
function showError(errorMessage){
    const html = `<div class="card">${errorMessage}</div>`
    header.insertAdjacentHTML('afterend',html);
}
function showCard({ name, country, temp, icon, text}){
    const html = `
    <div class="card">
    <h2 class="card-city">${name}<span>${country}</span></h2>
    <div class="card-wather">
        <div class="card-value">${temp}<sup>°c</sup></div>
        <img class="card-img" src="${icon}" alt="Wather">
    </div>
    <div class="card-discription">${text}</div>
    </div>`;


    //вывод на старницу всей карточки
    header.insertAdjacentHTML('afterend',html);
}
async function getWeather(city){
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(url);
    const data = await response.json()
    console.log(data);
    return data;
}




form.onsubmit = async function(e){
    e.preventDefault();
    let city = input.value.trim();
    //Полчаем данные с сервера
    const data = await getWeather(city);

    if (data.error){
        removeCard();
        showError(data.error.message);
    }
    else
    {
        removeCard();
        const weatherData = {
            name: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            icon: data.current.condition.icon,
            text: data.current.condition.text,

        };
        showCard(weatherData);
    }
}
