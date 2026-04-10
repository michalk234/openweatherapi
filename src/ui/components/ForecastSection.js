export function createForecastSection(input) {
  if (input.isLoading || !input.dashboard) {
    return `
      <article class="panel forecast-card" aria-busy="true">
        <div class="panel-header"><h2 class="panel-title">3-Day Forecast</h2></div>
        <div class="panel-divider"></div>
        <div style="padding: 20px 32px 28px; display: grid; gap: 18px;">
          <div class="skeleton" style="height: 182px; border-radius: 18px;"></div>
          <div class="skeleton" style="height: 182px; border-radius: 18px;"></div>
          <div class="skeleton" style="height: 182px; border-radius: 18px;"></div>
        </div>
      </article>
    `;
  }

  return `
    <article class="panel forecast-card">
      <div class="panel-header"><h2 class="panel-title">3-Day Forecast</h2></div>
      <div class="panel-divider"></div>
      <div class="forecast-grid">
        ${input.dashboard.forecast.map(renderForecastCard).join('')}
      </div>
    </article>
  `;
}

function renderForecastCard(item) {
  return `
    <article class="forecast-item">
      <h3 class="forecast-day">${item.dayLabel}</h3>
      <div class="forecast-divider"></div>
      <div class="forecast-main">
        <img src="./src/ui/assets/weather/${item.illustration}.svg" alt="${item.description}" />
        <div class="forecast-temp-block">
          <p class="forecast-temp">${item.temperatureRange}</p>
          <p class="forecast-description">${item.description}</p>
        </div>
      </div>
      <div class="forecast-footer">
        <img src="./src/ui/assets/icons/drop.svg" alt="" />
        <span>${item.rainChance}</span>
      </div>
    </article>
  `;
}
