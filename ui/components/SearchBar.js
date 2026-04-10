export function createSearchBar(state) {
  return `
    <div class="toolbar">
      <form id="searchForm" class="search-form" novalidate>
        <input
          id="cityInput"
          class="search-input"
          type="text"
          name="city"
          value="${escapeHtml(state.city || '')}"
          placeholder="Enter city..."
          autocomplete="off"
          ${state.isLoading ? 'disabled' : ''}
        />
        <button class="search-button" type="submit" ${state.isLoading ? 'disabled' : ''}>
          ${state.isLoading ? 'Loading...' : 'Get Weather'}
        </button>
      </form>
      <div class="toolbar-actions" aria-label="Secondary actions">
        <a class="toolbar-link" href="#" onclick="return false;">
          <img src="./src/ui/assets/icons/refresh.svg" alt="" />
          <span>Refresh</span>
        </a>
        <div class="toolbar-separator" aria-hidden="true"></div>
        <a class="toolbar-link" href="#" onclick="return false;">
          <img src="./src/ui/assets/icons/heart.svg" alt="" />
          <span>Save Location</span>
        </a>
      </div>
    </div>
    ${renderStatusBanner(state)}
  `;
}

function renderStatusBanner(state) {
  if (state.error) return `<div class="status-banner status-banner--error">${escapeHtml(state.error)}</div>`;
  if (state.isLoading) return `<div class="status-banner status-banner--loading">Loading weather data...</div>`;
  return '';
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
