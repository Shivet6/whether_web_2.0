import type { IncomingMessage, ServerResponse } from "node:http";
import { weatherController } from "../Controllers/weatherController.js";

export function weatherRoutes(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<boolean> {
  const path = new URL(req.url ?? "/", "http://localhost").pathname;

  if (req.method === "GET" && path === "/api/weather") {
    return weatherController(req, res).then(() => true);
  }

  return Promise.resolve(false);
}
