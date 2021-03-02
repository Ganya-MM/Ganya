const express = require("express");
const path = require("path");

const router = express.Router();



router.get('/signup', (req,res) => {
    res.render('signup');
});

module.exports = router;