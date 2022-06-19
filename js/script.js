'use strict';

//Блок з погодою
const weatherBlock = document.querySelector('#weather'); //Отримуємо доступ до блока з погодою

//Створюємо асинхронну функцію
async function loadWeather(e) {
  /*  weatherBlock.innerHTML = `    //Гіфка завантаження
    <div class="weather__loading">
    <img src="img/loading.gif" alt="Loading...">
    </div>`; */
  //Записуємо у змінну силку на сервер з необхідними даними
  const server =
    'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Netishyn&appid=a0708644fb2971600a0cd6406575648f';
  //Робимо запит на сервер
  const response = await fetch(server, {
    method: 'GET',
  });
  //Отримуємо дані з сервера
  const responseResult = await response.json();
  //Перевірка, якщо дані отримано, то виводимо необхідну функцію, якщо ні, то виводимо повідомлення з помилкою
  if (response.ok) {
    getWeather(responseResult);
  } else {
    weatherBlock.innerHTML = responseResult.message;
  }
}

//У функції приймаємо необхідні дані і вписуємо їх у змінні, далі у змінну темплейт вписуємо наший код з хтмл,
//бо тепер, дані що в середині будуть прямо привязані до стану погоди (спочатку ми задавали будь-які для того,
// щоб подивитись на верстку). Далі вписуємо темплейт в хтмл і все
function getWeather(data) {
  //Обробляємо та виводимо дані
  const location = data.name;
  const temp = Math.round(data.main.temp);
  const feelslike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;

  //HTML
  const template = `
    <div class="weather__header">
          <div class="weather__main">
            <div class="weather__city">${location}</div>
            <div class="weather__status">${weatherStatus}</div>
          </div>
          <div class="weather__icon">
            <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}" />
          </div>
        </div>
        <div class="weather__temp">${temp}</div>
        <div class="weather__feels-like">Feels like: ${feelslike}</div>`;
  weatherBlock.innerHTML = template;
}
// Запускаємо функцію
if (weatherBlock) {
  loadWeather();
}
