const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/schoolController");
const calculatorDistanceMiddleware = require("../utils/distanceCalculator");


router  
    .route("/addSchool")   
    .post(schoolController.addSchool);

router
  .route("/listSchools")
  .get(calculatorDistanceMiddleware, schoolController.listSchools);

module.exports = router;
