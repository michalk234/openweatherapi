export function createCurrentWeatherCard(input) {
  if (input.isLoading || !input.dashboard) {
    return `
      <article class="panel current-card" aria-busy="true">
        <div class="panel-header"><h2 class="panel-title">Current Weather</h2></div>
        <div class="panel-divider"></div>
        <div style="padding: 28px 32px 18px;">
          <div class="skeleton" style="width: 220px; height: 36px;"></div>
          <div class="skeleton" style="width: 140px; height: 18px; margin-top: 14px;"></div>
          <div class="skeleton" style="width: 100%; height: 220px; margin-top: 24px; border-radius: 28px;"></div>
        </div>
      </article>
    `;
  }

  const { dashboard } = input;
  return `
    <article class="panel current-card">
      <div class="panel-header"><h2 class="panel-title">Current Weather</h2></div>
      <div class="panel-divider"></div>
      <div class="current-card-body">
        <div>
          <h3 class="location-title">${dashboard.locationName}</h3>
          <span class="location-updated">${dashboard.updatedAtLabel}</span>
          <div class="weather-hero">
            <img src="./src/ui/assets/weather/${dashboard.current.illustration}.svg" alt="${dashboard.current.description}" />
            <div class="current-temp-block">
              <p class="current-temp">${dashboard.current.temperature}</p>
              <p class="current-feels">Feels like: ${dashboard.current.feelsLike}</p>
              <p class="current-description">${dashboard.current.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="current-bottom-divider"></div>
      <div class="current-highlights">
        <div class="inline-stat"><img src="./src/ui/assets/icons/wind.svg" alt="" /><span>Wind: ${dashboard.current.wind}</span></div>
        <div class="inline-stat"><img src="./src/ui/assets/icons/humidity.svg" alt="" /><span>Humidity: ${dashboard.current.humidity}</span></div>
        <div class="inline-stat"><img src="./src/ui/assets/icons/pressure.svg" alt="" /><span>Pressure: ${dashboard.current.pressure}</span></div>
      </div>
    </article>
  `;
}
