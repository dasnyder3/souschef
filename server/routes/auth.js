const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failedlogin',
    failureFlash: 'Invalid Google credentials',
  }),
  (req, res) => {
    req.logIn(req.user, (err) => {
      if (err)
        return next({
          log: `auth callback: ERROR: ${err}`,
          message: {
            err: 'ERROR: Check server logs for details',
          },
        });
      res.redirect('/');
    });
  }
);

router.get('/user', (req, res) => {
  if (req.user) res.status(200).json({ user: req.user });
  else res.status(204).json({ user: {} });
});

module.exports = router;
