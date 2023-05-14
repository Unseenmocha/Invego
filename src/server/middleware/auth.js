// seems like for this course they want you to use passport and passport-local, according to the lecture slides
/*
import passport from 'passport'
import passportLocal from 'passport-local'

import { User } from '../models/users.js';

const { Strategy } = passportLocal;

const users = await User.find();

function findUser(username) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      return {found: true, user: users[i]};
    }
  }
  return {found: false, user: null};
}

const strategy = new Strategy(async (username,password,done) => { 
  let {found, user} = findUser(username);
  if (found) {
    if (user.password === password) {
      console.log("passwords match");
      return done(null, username);
    } else {
      console.log("passwords do not match");
      return done(null, false, { message: 'Incorrect password.' });
    }
  } else {
    console.log("user not found");
    return done(null, false, { message: 'Incorrect username.' });
  }
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
  },
  authenticate: (domain, where) => {
    return passport.authenticate(domain, where);
  },
}*/