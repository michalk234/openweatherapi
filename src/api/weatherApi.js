import { CONFIG } from '../config/config.local.js';
const BASE_URL='https://api.openweathermap.org/data/2.5';
function getApiKey(){return localStorage.getItem('OPENWEATHER_API_KEY')||CONFIG.OPENWEATHER_API_KEY;}
export async function fetchWeatherDashboardData(city){
 const key=getApiKey(); if(!key) throw new Error('Missing API key');
 const res=await fetch(`${BASE_URL}/weather?q=${city}&appid=${key}&units=metric`);
 if(!res.ok) throw new Error('API error'); return res.json();
}