import type { IncomingMessage, ServerResponse } from "node:http";
import { getWeather } from "../Services/weatherService.js";
import { failure, success } from "../Utils/response.js";

export async function weatherController(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const url = new URL(req.url ?? "/", "http://localhost");
  const city = url.searchParams.get("city")?.trim();
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  if (!city && (!lat || !lon)) {
    failure(res, 400, "Please provide a city or both latitude and longitude.");
    return;
  }

  if (!city && (Number.isNaN(Number(lat)) || Number.isNaN(Number(lon)))) {
    failure(res, 400, "Latitude and longitude must be valid numbers.");
    return;
  }

  try {
    const query = city ?? `${lat},${lon}`;
    const weather = await getWeather(query);
    success(res, weather);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load weather.";
    const status = message.includes("API key") ? 500 : 502;
    failure(res, status, message);
  }
}
