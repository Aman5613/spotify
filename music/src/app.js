import express from 'express';
import morgan from 'morgan';
import musicRouter from "../src/routers/music.router.js";
import cookieParser from 'cookie-parser';
import cors from "cors";
import config from "../src/config/config.js";

const app = express();


app.use(cors({
  origin: config.FRONTEND_URL,
  credentials : true
}))
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/music", musicRouter);


app.get("/", (req, res) => {
  res.send("Music Server is up and running");
});

export default app;