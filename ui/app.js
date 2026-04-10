import { fetchWeather } from '../api/weatherApi.js';
import { mapWeatherData } from '../model/weatherModel.js';

document.getElementById('searchBtn').addEventListener('click', async () => {
  const city = document.getElementById('cityInput').value;
  const data = await fetchWeather(city);
  const model = mapWeatherData(data);
  render(model);
});

function render(model) {
  document.getElementById('currentWeather').innerHTML =
    `<h2>${model.city}</h2><p>${model.temp}°C</p>`;
}
