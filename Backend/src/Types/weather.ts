export interface WeatherLocation {
  name: string;
  country: string;
  region?: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  highTemperature: number;
  lowTemperature: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  pressure: number;
  uvIndex: number;
  cloudCoverage: number;
  sunrise: string;
  sunset: string;
}

export interface HourlyForecastItem {
  time: string;
  temperature: number;
  condition: string;
  icon: string;
  precipitationChance: number;
}

export interface DailyForecastItem {
  date: string;
  minTemperature: number;
  maxTemperature: number;
  condition: string;
  icon: string;
  precipitationChance: number;
}

export interface WeatherData {
  location: WeatherLocation;
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
}

export interface WeatherApiResponse {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
  };
  current: {
    temp_c: number;
    feelslike_c: number;
    condition: { text: string };
    humidity: number;
    wind_kph: number;
    wind_degree: number;
    vis_km: number;
    pressure_mb: number;
    uv: number;
    cloud: number;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface ForecastDay {
  date: string;
  day: {
    mintemp_c: number;
    maxtemp_c: number;
    condition: { text: string };
    daily_chance_of_rain: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
  hour: ForecastHour[];
}

export interface ForecastHour {
  time: string;
  temp_c: number;
  condition: { text: string };
  chance_of_rain: number;
}
