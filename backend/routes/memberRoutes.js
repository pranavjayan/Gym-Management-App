const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");


router.get("/", memberController.getAllClients); 
router.get("/trainers", memberController.getAllTrainers); 
router.get("/:id", memberController.getClientById); 
router.put("/:id", memberController.updateClient); 
router.put("/:id/promote", memberController.promoteToTrainer); 
router.delete("/:id", memberController.deleteClient); 

module.exports = router;
