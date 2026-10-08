const port = Number(process.env.PORT ?? 5000);

if (!Number.isInteger(port) || port <= 0) {
  throw new Error("PORT must be a positive integer.");
}

export const env = {
  apiKey: process.env.WEATHER_API_KEY?.trim() ?? "",
  port,
};
