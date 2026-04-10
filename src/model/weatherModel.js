export function mapWeatherData(data) {
  return {
    city: data.name,
    temp: data.main.temp
  };
}
