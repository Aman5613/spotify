import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import authRouter from "../src/routes/auth.route.js";


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/api/v1/auth", authRouter);



export default app;