import type { WeatherData } from "../Types/weather";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

interface WeatherResponse {
  success: boolean;
  data?: WeatherData;
  message?: string;
}

async function requestWeather(url: string): Promise<WeatherData> {
  const response = await fetch(url);

  const result: WeatherResponse = await response.json();

  if (!response.ok || !result.success || !result.data) {
    throw new Error(result.message || "Unable to fetch weather data");
  }

  return result.data;
}

export async function getWeatherByCity(
  city: string
): Promise<WeatherData> {
  const url = `${API_BASE_URL}/api/weather?city=${encodeURIComponent(city)}`;

  return requestWeather(url);
}

export async function getWeatherByCoordinates(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const url = `${API_BASE_URL}/api/weather?lat=${lat}&lon=${lon}`;

  return requestWeather(url);
}