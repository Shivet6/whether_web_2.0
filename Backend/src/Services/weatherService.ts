import { env } from "../Config/environment.js";
import type {
  ForecastDay,
  ForecastHour,
  WeatherApiResponse,
  WeatherData,
} from "../Types/weather.js";

const iconMap: Record<string, string> = {
  sunny: "☀",
  clear: "☀",
  partly: "◐",
  cloudy: "☁",
  overcast: "☁",
  rain: "☂",
  drizzle: "☂",
  thunder: "ϟ",
  snow: "❄",
  sleet: "❄",
  mist: "≋",
  fog: "≋",
  haze: "≋",
};

function iconFor(condition: string): string {
  const key = Object.keys(iconMap).find((name) =>
    condition.toLowerCase().includes(name),
  );

  return iconMap[key ?? "cloudy"];
}

function normalizeHour(hour: ForecastHour): {
  time: string;
  temperature: number;
  condition: string;
  icon: string;
  precipitationChance: number;
} {
  return {
    time: hour.time,
    temperature: hour.temp_c,
    condition: hour.condition.text,
    icon: iconFor(hour.condition.text),
    precipitationChance: hour.chance_of_rain,
  };
}

function getNext24Hours(days: ForecastDay[]): ReturnType<typeof normalizeHour>[] {
  const now = Date.now();

  return days
    .flatMap((day) => day.hour)
    .filter((hour) => new Date(hour.time).getTime() >= now)
    .slice(0, 24)
    .map(normalizeHour);
}

function normalize(raw: WeatherApiResponse): WeatherData {
  const firstDay = raw.forecast.forecastday[0];

  return {
    location: {
      name: raw.location.name,
      country: raw.location.country,
      region: raw.location.region || undefined,
      latitude: raw.location.lat,
      longitude: raw.location.lon,
      timezone: raw.location.tz_id,
    },
    current: {
      temperature: raw.current.temp_c,
      feelsLike: raw.current.feelslike_c,
      highTemperature: firstDay.day.maxtemp_c,
      lowTemperature: firstDay.day.mintemp_c,
      condition: raw.current.condition.text,
      description: raw.current.condition.text,
      icon: iconFor(raw.current.condition.text),
      humidity: raw.current.humidity,
      windSpeed: raw.current.wind_kph,
      windDirection: raw.current.wind_degree,
      visibility: raw.current.vis_km,
      pressure: raw.current.pressure_mb,
      uvIndex: raw.current.uv,
      cloudCoverage: raw.current.cloud,
      sunrise: firstDay.astro.sunrise,
      sunset: firstDay.astro.sunset,
    },
    hourly: getNext24Hours(raw.forecast.forecastday),
    daily: raw.forecast.forecastday.slice(0, 3).map((day) => ({
      date: day.date,
      minTemperature: day.day.mintemp_c,
      maxTemperature: day.day.maxtemp_c,
      condition: day.day.condition.text,
      icon: iconFor(day.day.condition.text),
      precipitationChance: day.day.daily_chance_of_rain,
    })),
  };
}

export async function getWeather(query: string): Promise<WeatherData> {
  if (!env.apiKey) {
    throw new Error(
      "Weather API key is missing. Add WEATHER_API_KEY to Backend/.env.",
    );
  }

  const endpoint = new URL("https://api.weatherapi.com/v1/forecast.json");
  endpoint.searchParams.set("key", env.apiKey);
  endpoint.searchParams.set("q", query);
  endpoint.searchParams.set("days", "3");
  endpoint.searchParams.set("aqi", "no");
  endpoint.searchParams.set("alerts", "no");

  let response: Response;

  try {
    response = await fetch(endpoint);
  } catch {
    throw new Error("Weather provider is unreachable. Check your internet connection.");
  }

  const raw: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    if (
      typeof raw === "object" &&
      raw !== null &&
      "error" in raw &&
      typeof raw.error === "object" &&
      raw.error !== null &&
      "message" in raw.error &&
      typeof raw.error.message === "string"
    ) {
      throw new Error(raw.error.message);
    }

    throw new Error("The weather provider returned an error.");
  }

  return normalize(raw as WeatherApiResponse);
}
