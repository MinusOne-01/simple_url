import express from "express";
import cors from "cors";
import urlRoutes from "./modules/urls/url.routes.js" 

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.use(urlRoutes);


export default app;