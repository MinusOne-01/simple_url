import express from "express";
import cors from "cors";
import urlRoutes from "./modules/urls/url.routes.js" 
import analyticsRoutes from "../src/modules/analytics/analytics.routes.js";

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.use(urlRoutes);
app.use("/data", analyticsRoutes);


export default app;