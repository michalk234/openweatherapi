import { fetchWeatherDashboardData } from '../api/weatherApi.js';
(async()=>{try{console.log(await fetchWeatherDashboardData('Warsaw'));}catch(e){console.error(e);}})();