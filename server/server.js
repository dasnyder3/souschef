const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const session = require('express-session');
const db = require('./models/pgModel');
const config = require('config');
const passport = require('passport');
const {
  findOrCreateUser,
  checkUserLoggedIn,
  checkUserNotLoggedIn,
} = require('./controllers/authController');

let GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SESSION_SECRET;
if (process.env.NODE_ENV === 'production') {
  GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID; //config.util.getEnv('GOOGLE_CLIENT_ID');
  GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET; //config.util.getEnv('GOOGLE_CLIENT_SECRET');
  SESSION_SECRET = process.env.SESSION_SECRET; //config.util.getEnv('SESSION_SECRET');
} else {
  const oAuth = config.get('googleOAuth');
  // console.log(process.env.NODE_ENV);
  GOOGLE_CLIENT_ID = oAuth.GOOGLE_CLIENT_ID;
  GOOGLE_CLIENT_SECRET = oAuth.GOOGLE_CLIENT_SECRET;
  SESSION_SECRET = oAuth.SESSION_SECRET;
}

// google oauth
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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
  cb(null, user);
});

passport.deserializeUser(function (user, done) {
  const queryString = `
    SELECT * FROM users WHERE google_id = $1
  `;
  const params = [user];
  db.query(queryString, params)
    .then((data) => {
      done(null, data.rows[0]);
    })
    .catch((err) => new Error(err));
});

// require routers
const recipesRouter = require('./routes/recipes');
const authRouter = require('./routes/auth');

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

app.use('/auth', authRouter);

app.use('/build', express.static(path.join(__dirname, '../build')));

app.use('/recipes', recipesRouter);

app.get('/login', checkUserNotLoggedIn, (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
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
