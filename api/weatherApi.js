const BASE_URL = 'https://api.openweathermap.org/data/2.5';

function getApiKey() {
  const localStorageKey = window.localStorage.getItem('OPENWEATHER_API_KEY');
  const globalKey = window.OPENWEATHER_API_KEY;
  return localStorageKey || globalKey || 'YOUR_API_KEY';
}

export async function fetchWeatherDashboardData(cityName) {
  const apiKey = getApiKey();

  if (!apiKey || apiKey === 'YOUR_API_KEY') {
    throw new Error(
      'Missing API key. Set window.OPENWEATHER_API_KEY in index.html or save OPENWEATHER_API_KEY in localStorage.'
    );
  }

  const currentUrl = `${BASE_URL}/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;
  const forecastUrl = `${BASE_URL}/forecast?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;

  const [currentResponse, forecastResponse] = await Promise.all([
    fetch(currentUrl),
    fetch(forecastUrl),
  ]);

  if (!currentResponse.ok || !forecastResponse.ok) {
    const message = await resolveErrorMessage(currentResponse, forecastResponse);
    throw new Error(message);
  }

  const [current, forecast] = await Promise.all([currentResponse.json(), forecastResponse.json()]);
  return { current, forecast };
}

async function resolveErrorMessage(currentResponse, forecastResponse) {
  const response = !currentResponse.ok ? currentResponse : forecastResponse;
  try {
    const payload = await response.json();
    if (payload?.message) {
      return payload.message.charAt(0).toUpperCase() + payload.message.slice(1);
    }
  } catch (_) {}
  return 'Weather service is currently unavailable.';
}
