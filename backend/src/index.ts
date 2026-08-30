import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { connectDatabase, disconnectDatabase } from "./database.js";
import healthRoutes from "./api/health.js";
import authRoutes from "./api/auth.js";
import peopleRoutes from "./api/people.js";
import remembranceRoutes from "./api/remembrances.js";
import contextRoutes from "./api/contexts.js";
import settingsRoutes from "./api/settings.js";
import timelineRoutes from "./api/timeline.js";

const app = express();

// Middleware
app.use(cors({ origin: config.frontendUrl, credentials: true }));
app.use(express.json());

// Routes
app.use("/", healthRoutes);
app.use("/auth", authRoutes);
app.use("/people", peopleRoutes);
app.use("/people/:personId/remembrances", remembranceRoutes);
app.use("/people/:personId/contexts", contextRoutes);
app.use("/settings", settingsRoutes);
app.use("/timeline", timelineRoutes);

// Start server
async function start() {
  await connectDatabase();

  app.listen(config.port, () => {
    console.log(`MIORA API running on http://localhost:${config.port}`);
    console.log(`Environment: ${config.nodeEnv}`);
    console.log(`Frontend URL: ${config.frontendUrl}`);
  });
}

start().catch(console.error);

// Graceful shutdown
process.on("SIGINT", async () => {
  await disconnectDatabase();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await disconnectDatabase();
  process.exit(0);
});
