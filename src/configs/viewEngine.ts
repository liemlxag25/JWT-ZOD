import path from "path";
import { Express } from "express";
import ejsLayouts from "express-ejs-layouts";

const viewEngineConfig = (app: Express) => {
  const root = process.env.NODE_ENV === "production" ? "dist" : "src";
  app.set("views", path.join(process.cwd(), root, "views"));
  app.set("view engine", "ejs");
  app.use(ejsLayouts);
  app.set("layout", "layouts/main");
};

export default viewEngineConfig;
