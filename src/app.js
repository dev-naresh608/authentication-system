import express from "express";
import morgan from "morgan";
import authRoute from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();

// Middle Wares
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/auth',authRoute);

export default app;