export async function fetchWeather(city) {
  const API_KEY = '9591c51f42b98fc77434e3e78a513728';
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  return res.json();
}
