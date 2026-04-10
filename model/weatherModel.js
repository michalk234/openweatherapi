const weatherIllustrationMap = {
  Clear: 'sunny',
  Clouds: 'partly-cloudy',
  Rain: 'rainy',
  Drizzle: 'rainy',
  Thunderstorm: 'rainy',
  Snow: 'cloudy',
  Mist: 'cloudy',
  Fog: 'cloudy',
  Haze: 'cloudy',
};

const conditionLabelMap = {
  Clear: 'Sunny',
  Clouds: 'Partly Cloudy',
  Rain: 'Showers',
  Drizzle: 'Light Rain',
  Thunderstorm: 'Stormy',
  Snow: 'Snow',
  Mist: 'Misty',
  Fog: 'Foggy',
  Haze: 'Hazy',
};

export function mapWeatherDashboardData(apiData) {
  const { current, forecast } = apiData;
  const currentCondition = current.weather?.[0]?.main || 'Clouds';
  const currentDescription = current.weather?.[0]?.description || currentCondition;

  return {
    locationName: `${current.name}, ${current.sys?.country || ''}`.replace(/,\s*$/, ''),
    updatedAtLabel: formatUpdatedLabel(current.dt),
    current: {
      temperature: formatTemperature(current.main?.temp),
      feelsLike: formatTemperature(current.main?.feels_like),
      description: titleCase(currentDescription),
      illustration: selectIllustration(currentCondition),
      wind: `${Math.round(current.wind?.speed ?? 0)} km/h`,
      humidity: `${Math.round(current.main?.humidity ?? 0)}%`,
      pressure: `${Math.round(current.main?.pressure ?? 0)} hPa`,
    },
    details: [
      { icon: 'humidity', label: 'Humidity', value: `${Math.round(current.main?.humidity ?? 0)}%` },
      { icon: 'pressure', label: 'Pressure', value: `${Math.round(current.main?.pressure ?? 0)} hPa` },
      { icon: 'wind', label: 'Wind', value: `${Math.round(current.wind?.speed ?? 0)} km/h` },
      { icon: 'clock', label: 'Last Update', value: formatUpdatedLabel(current.dt).replace('Updated: ', '') },
    ],
    forecast: mapForecastDays(forecast.list || []),
  };
}

function mapForecastDays(entries) {
  const grouped = new Map();
  for (const entry of entries) {
    const date = new Date(entry.dt * 1000);
    const key = date.toISOString().slice(0, 10);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(entry);
  }

  const todayKey = new Date().toISOString().slice(0, 10);
  const forecastDays = [];

  for (const [dateKey, dayEntries] of grouped.entries()) {
    if (dateKey === todayKey) continue;
    const representative = pickRepresentativeEntry(dayEntries);
    const weatherMain = representative.weather?.[0]?.main || 'Clouds';
    const description = representative.weather?.[0]?.description || weatherMain;
    const min = Math.min(...dayEntries.map((item) => item.main?.temp_min ?? item.main?.temp ?? 0));
    const max = Math.max(...dayEntries.map((item) => item.main?.temp_max ?? item.main?.temp ?? 0));
    const rainProbability = Math.max(...dayEntries.map((item) => Math.round((item.pop ?? 0) * 100)));

    forecastDays.push({
      dayLabel: formatDayName(dateKey),
      illustration: selectIllustration(weatherMain),
      temperatureRange: `${Math.round(max)}°C / ${Math.round(min)}°C`,
      description: titleCase(conditionLabelMap[weatherMain] || description),
      rainChance: `Rain: ${rainProbability}%`,
    });

    if (forecastDays.length === 3) break;
  }

  return forecastDays;
}

function pickRepresentativeEntry(dayEntries) {
  const middayEntry = dayEntries.find((entry) => entry.dt_txt?.includes('12:00:00'));
  return middayEntry || dayEntries[Math.floor(dayEntries.length / 2)] || dayEntries[0];
}

function formatTemperature(value) { return `${Math.round(value ?? 0)}°C`; }

function formatUpdatedLabel(unixSeconds) {
  if (!unixSeconds) return 'Updated: just now';
  const date = new Date(unixSeconds * 1000);
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `Updated: ${time}`;
}

function selectIllustration(condition) { return weatherIllustrationMap[condition] || 'partly-cloudy'; }

function titleCase(value) {
  return String(value).split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function formatDayName(dateKey) {
  const date = new Date(`${dateKey}T12:00:00`);
  return date.toLocaleDateString([], { weekday: 'long' });
}
