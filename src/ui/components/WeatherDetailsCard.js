export function createWeatherDetailsCard(input) {
  if (input.isLoading || !input.dashboard) {
    return `
      <article class="panel details-card" aria-busy="true">
        <div class="panel-header"><h2 class="panel-title">Details</h2></div>
        <div class="panel-divider"></div>
        <div style="padding: 18px 22px 22px;">
          <div class="skeleton" style="height: 56px; margin-bottom: 14px;"></div>
          <div class="skeleton" style="height: 56px; margin-bottom: 14px;"></div>
          <div class="skeleton" style="height: 56px; margin-bottom: 14px;"></div>
          <div class="skeleton" style="height: 56px;"></div>
        </div>
      </article>
    `;
  }

  return `
    <article class="panel details-card">
      <div class="panel-header"><h2 class="panel-title">Details</h2></div>
      <div class="panel-divider"></div>
      <div class="details-list">
        ${input.dashboard.details.map(renderDetailsRow).join('')}
      </div>
    </article>
  `;
}

function renderDetailsRow(item) {
  return `
    <div class="details-row">
      <img src="./src/ui/assets/icons/${item.icon}.svg" alt="" />
      <span class="details-label">${item.label}</span>
      <span class="details-value">${item.value}</span>
    </div>
  `;
}
