import { fetchWeatherDashboardData } from '../api/weatherApi.js';
import { mapWeatherDashboardData } from '../model/weatherModel.js';
import { createSearchBar } from './components/SearchBar.js';
import { createCurrentWeatherCard } from './components/CurrentWeatherCard.js';
import { createWeatherDetailsCard } from './components/WeatherDetailsCard.js';
import { createForecastSection } from './components/ForecastSection.js';

const dom = {
  searchBarRoot: document.getElementById('searchBarRoot'),
  currentWeatherRoot: document.getElementById('currentWeatherRoot'),
  weatherDetailsRoot: document.getElementById('weatherDetailsRoot'),
  forecastRoot: document.getElementById('forecastRoot'),
};

const initialCity = 'Warsaw';

let state = {
  city: initialCity,
  isLoading: false,
  error: '',
  dashboard: null,
};

bootstrap();

async function bootstrap() {
  render();
  await loadCity(initialCity);
}

async function loadCity(cityName) {
  if (!cityName || !cityName.trim()) {
    state = { ...state, error: 'Please enter a city name.' };
    render();
    return;
  }

  state = { ...state, city: cityName.trim(), isLoading: true, error: '' };
  render();

  try {
    const apiData = await fetchWeatherDashboardData(state.city);
    const mapped = mapWeatherDashboardData(apiData);
    state = { ...state, dashboard: mapped, isLoading: false, error: '' };
  } catch (error) {
    state = {
      ...state,
      dashboard: null,
      isLoading: false,
      error: error.message || 'Unable to load weather data.',
    };
  }

  render();
}

function render() {
  dom.searchBarRoot.innerHTML = createSearchBar({
    city: state.city,
    isLoading: state.isLoading,
    error: state.error,
  });

  dom.currentWeatherRoot.innerHTML = createCurrentWeatherCard({
    dashboard: state.dashboard,
    isLoading: state.isLoading,
  });

  dom.weatherDetailsRoot.innerHTML = createWeatherDetailsCard({
    dashboard: state.dashboard,
    isLoading: state.isLoading,
  });

  dom.forecastRoot.innerHTML = createForecastSection({
    dashboard: state.dashboard,
    isLoading: state.isLoading,
  });

  bindSearchEvents();
}

function bindSearchEvents() {
  const form = document.getElementById('searchForm');
  const cityInput = document.getElementById('cityInput');
  if (!form || !cityInput) return;
  cityInput.focus();
  cityInput.setSelectionRange(cityInput.value.length, cityInput.value.length);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    loadCity(cityInput.value);
  });
}
