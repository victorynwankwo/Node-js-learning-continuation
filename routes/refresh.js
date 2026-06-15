const express = require("express");
const router = express.Router();
const  handleRefreshTokenController  = require("../controllers/refreshTokenController");

router.get("/", handleRefreshTokenController.handleRefreshToken)

module.exports = router