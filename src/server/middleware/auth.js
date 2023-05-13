// seems like for this course they want you to use passport and passport-local, according to the lecture slides
import passport from 'passport'
import passportLocal from 'passport-local'

import { User } from '../models/users.js';

const { Strategy } = passportLocal;

const users = await User.find();

const strategy = new Strategy(async (username,password,done) => {
//
});


passport.use(strategy);

passport.serializeUser((username, done) => {
  done(null, username);
});

passport.deserializeUser((username, done) => {
  done(null, username);
});

export default {
  configure: (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
  }
}