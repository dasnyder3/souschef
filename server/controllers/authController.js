const db = require('../models/pgModel');

module.exports = {
  findOrCreateUser: async function (profile) {
    console.log('profile: ', profile);
    const findUser = 'SELECT * FROM users WHERE google_id = $1';
    const params = [profile.id];
    let user = await db
      .query(findUser, params)
      .then((data) => data.rows[0])
      .catch((err) =>
        next({
          log: `findOrCreateUser: ERROR: ${err}`,
          message: {
            err: 'ERROR: Check server logs for details',
          },
        })
      );
    try {
      if (!user) {
        const createUser = `
            INSERT INTO users (google_id, display_name, given_name, family_name, picture, email)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
          `;
        const createUserParams = [
          profile.id,
          profile.displayName,
          profile.name.givenName,
          profile.name.familyName,
          profile.photos[0].value,
          profile.emails[0].value,
        ];

        user = await db
          .query(createUser, createUserParams)
          .then((data) => data.rows[0])
          .catch((err) =>
            next({
              log: `findOrCreateUser: ERROR: ${err}`,
              message: {
                err: 'ERROR: Check server logs for details',
              },
            })
          );
      } else {
        const updateUser = `
            UPDATE users
            SET display_name = $2, given_name = $3, family_name = $4, picture = $5, email = $6
            WHERE google_id = $1
            RETURNING *
          `;
        const updateUserParams = [
          profile.id,
          profile.displayName,
          profile.name.givenName,
          profile.name.familyName,
          profile.photos[0].value,
          profile.emails[0].value,
        ];
        user = await db
          .query(updateUser, updateUserParams)
          .then((data) => data.rows[0])
          .catch((err) =>
            next({
              log: `findOrCreateUser: ERROR: ${err}`,
              message: {
                err: 'ERROR: Check server logs for details',
              },
            })
          );
      }
    } catch (err) {
      return next({
        log: `findOrCreateUser: ERROR: ${err}`,
        message: {
          err: 'ERROR: Check server logs for details',
        },
      });
    }
  },
  checkUserLoggedIn: (req, res, next) => {
    req.user ? next() : res.redirect('/login');
  },
  checkUserNotLoggedIn: (req, res, next) => {
    req.user ? res.redirect('/') : next();
  },
};
