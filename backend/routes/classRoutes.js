const express = require("express");
const {
  addClass,
  getAllClasses,
  deleteClass,
  updateClass,
} = require("../controllers/classController"); 

const router = express.Router();


router.post("/add", addClass);
router.get("/", getAllClasses);
router.delete("/:id", deleteClass);
router.put("/:id", updateClass);

module.exports = router;
