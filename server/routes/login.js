const express = require('express');
const path = require('path');

// const loginController = require('loginController');

const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, './../../login.html'))
});

module.exports = router;