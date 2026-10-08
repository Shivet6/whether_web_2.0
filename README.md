# Weather App — Ready-to-Run Final Version

This is the complete weather website based on the project Bible, with the forecast adapted to 3 days.

## Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + TypeScript + built-in Node HTTP
- Weather provider: WeatherAPI.com
- Database: none
- Express/Fastify/Nest: none

## 1. Get your WeatherAPI key

Create a WeatherAPI.com account and copy your API key.

WeatherAPI currently provides a free plan with real-time weather and a 3-day forecast (the Master Bible originally specifies 7 days; this build intentionally uses 3 days). Its signup/trial and paid plans can provide 7-day forecasting. This version is intentionally configured for a 3-day forecast (the Master Bible originally specifies 7 days; this build intentionally uses 3 days) so it works with the WeatherAPI.com free plan.

## 2. Add the key

Open:

`Backend/.env`

Put your key here:

```env
WEATHER_API_KEY=YOUR_REAL_API_KEY
PORT=5000
```

Keep this file private. The API key is never put into the frontend.

## 3. Install and start the backend

### Easiest way on Windows

Double-click:

`start-backend.bat`

Or use VS Code Terminal:

```powershell
cd Backend
npm install
npm run dev
```

You should see:

```text
Weather backend running at http://localhost:5000
```

## 4. Start the website

Double-click:

`start-frontend.bat`

Or use a second VS Code Terminal:

```powershell
cd Frontend
npm install
npm run dev
```

Open the Vite address, normally:

`http://localhost:5173`

## 5. What is included

- Search city/place
- Browser current location
- Current temperature and condition
- Feels-like temperature
- Next 24 hours
- 3-day forecast (the Master Bible originally specifies 7 days; this build intentionally uses 3 days)
- Humidity
- Wind
- Visibility
- Pressure
- UV index
- Cloud coverage
- Sunrise and sunset
- Light/dark theme
- Loading state
- Error state
- Responsive desktop/tablet/390px/320px layouts
- Warm neutral design with no blue
- Backend API security boundary

## Architecture

```text
Browser
   ↓
React + Vite
   ↓ /api/weather
Node.js backend
   ↓
WeatherAPI.com
   ↓
Node.js backend
   ↓
React website
```

The external weather API key exists only in `Backend/.env`.
