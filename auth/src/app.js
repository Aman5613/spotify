import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import passport from 'passport';
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import cors from 'cors';


import authRouter from "../src/routes/auth.route.js";
import config from "./config/config.js";

const app = express();

app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);


app.use(passport.initialize());

// Configure Passport to use Google OAuth 2.0 strategy
passport.use(new GoogleStrategy({
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: '/api/v1/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Here, you would typically find or create a user in your database
  // For this example, we'll just return the profile
  return done(null, profile);
}));


export default app;