// seems like for this course they want you to use passport and passport-local, according to the lecture slides


import passport from 'passport'
import passportLocal from 'passport-local'



// I don't know how this works
export function auth (req, res, next) {
    console.log("auth called");
    next()
  }

