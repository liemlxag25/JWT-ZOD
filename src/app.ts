import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import viewEngineConfig from "./configs/viewEngine";
import router from "./routes/web";
import { errorHandler } from "./middlewares/error.middleware";


const app = express();

viewEngineConfig(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Dùng dist/public khi production
const staticDir =
  process.env.NODE_ENV === "production"
    ? path.join(process.cwd(), "dist", "public")
    : path.join(process.cwd(), "src", "public");

app.use(express.static(staticDir));

app.use(router);

app.use(errorHandler);


export default app;
