# Weather Dashboard

Simple weather dashboard starter with a clean UI and MVC-ready structure.

## Features
- Search city weather
- Current weather card
- Details card
- 3-day forecast
- Loading and error states
- Vanilla JS structure prepared for future MVC growth

## API key setup

Option 1: set a global key in `index.html`

```html
<script>
  window.OPENWEATHER_API_KEY = 'YOUR_REAL_API_KEY';
</script>
```

Add it before the main module script.

Option 2: save key in browser console

```js
localStorage.setItem('OPENWEATHER_API_KEY', 'YOUR_REAL_API_KEY');
```

## Structure
- `src/api` - API communication
- `src/model` - mapping and business logic
- `src/ui/components` - rendering functions
- `src/ui/styles` - styles
- `tests` - reserved for Vitest tests in next iteration
