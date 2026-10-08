import type { IncomingMessage, ServerResponse } from "node:http";
import { weatherRoutes } from "../src/Routes/weatherRoutes.js";
import { sendJson } from "../src/Utils/response.js";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  const handled = await weatherRoutes(req, res);

  if (!handled) {
    sendJson(res, 404, { success: false, message: "Route not found." });
  }
}
