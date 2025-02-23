const express = require("express");
const { uploadProgress, getProgress, addProgress } = require("../controllers/progressController");
const multer = require("multer");
const path = require("path");

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/:userId", getProgress);
router.post("/", upload.single("photo"), addProgress); 

module.exports = router;
