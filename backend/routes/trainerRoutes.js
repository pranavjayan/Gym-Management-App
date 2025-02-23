const express = require("express");
const { getTrainerClients } = require("../controllers/trainerController");

const router = express.Router();

router.get("/clients/:trainerName", getTrainerClients);

module.exports = router;
