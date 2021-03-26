const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const session = require('express-session');

// google oauth
const passport = require('passport');
const { findOrCreateUser } = require('./controllers/authController');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SESSION_SECRET,
} = require('./keys');
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/auth/google/callback',
      passReqToCallback: true,
    },
    function (req, accessToken, refreshToken, profile, done) {
      findOrCreateUser(profile);
      return done(null, profile.id);
    }
  )
);

passport.serializeUser(function (user, cb) {
  console.log('serializing user: ', typeof user);
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  console.log('deserializing user: ', obj);
  cb(null, obj);
});

// require routers
const recipesRouter = require('./routes/recipes');
const authRouter = require('./routes/auth');

const checkUserLoggedIn = (req, res, next) => {
  // console.log('req.user: ', req.user);
  req.user ? next() : res.redirect('/login');
};

// handle parsing request body
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.get(
//   '/auth/google',
//   (req, res, next) => {
//     console.log('HERE IN THE AUTH GOOGLE ROUTE');
//     return next();
//   },
//   passport.authenticate('google', { scope: ['email', 'profile'] })
// );

// app.get(
//   '/auth/google/callback',
//   (req, res, next) => {
//     console.log('in callback');
//     console.log(req.query.code);
//     return next();
//   },
//   passport.authenticate('google', {
//     failureRedirect: '/login',
//   }),
//   (req, res) => {
//     req.logIn(req.user, (err) => {
//       if (err) return next(err);
//       res.redirect('/');
//     });
//   }
// );

// app.get(
//   '/test',
//   (req, res, next) => {
//     console.log('in test route');
//     return next();
//   },
//   (req, res) => res.redirect('/')
// );

app.use('/auth', authRouter);

app.use('/build', express.static(path.join(__dirname, '../build')));

app.use('/recipes', recipesRouter);

app.get('/login', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/*', checkUserLoggedIn, (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).send(errorObj.message);
});

app.listen(3000);
