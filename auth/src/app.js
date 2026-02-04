import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import passport from 'passport';
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import cors from 'cors';
import userModel from './models/user.model.js';


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
passport.use(
  new GoogleStrategy(
    {
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await userModel.findOne({
          $or: [
            { googleId: profile.id },
            { email: profile.emails?.[0]?.value },
          ],
        });

        let user;

        if (existingUser) {
          // Link Google account if not linked
          if (!existingUser.googleId) {
            existingUser.googleId = profile.id;
            await existingUser.save();
          }
          user = existingUser;
        } else {
          user = await userModel.create({
            googleId: profile.id,
            email: profile.emails?.[0]?.value,
            fullName: {
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
            },
          });
        }

        return done(null, user);

      } catch (err) {
        return done(err, null);
      }
    },
  ),
);


export default app;