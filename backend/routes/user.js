const express = require('express');
const { handleCreateUser } = require('../controllers/user');

const router = express.Router()

router.post("/signup", handleCreateUser);

module.exports = router;