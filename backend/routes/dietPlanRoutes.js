const express = require("express");
const router = express.Router();
const dietPlanController = require("../controllers/dietPlanController");


router.post("/", dietPlanController.createDietPlan);
router.get("/", dietPlanController.getAllDietPlans);
router.get("/client/:clientId", dietPlanController.getDietPlanByClient);
router.put("/:id", dietPlanController.updateDietPlan);
router.delete("/:id", dietPlanController.deleteDietPlan);

module.exports = router;
