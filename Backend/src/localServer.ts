import { createServer } from "node:http";
import { env } from "./Config/environment.js";
import { weatherRoutes } from "./Routes/weatherRoutes.js";
import { sendJson } from "./Utils/response.js";

const server = createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  const handled = await weatherRoutes(req, res);

  if (!handled) {
    sendJson(res, 404, {
      success: false,
      message: "Route not found.",
    });
  }
});

server.on("error", (error) => {
  console.error("Backend server error:", error);
});

server.listen(env.port, "localhost", () => {
  console.log(`Weather backend running at http://localhost:${env.port}`);
});
