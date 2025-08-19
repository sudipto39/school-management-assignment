const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/schoolController");



router  
    .route("/addSchool")   
    .post(schoolController.addSchool);

router
  .route("/listSchools")
  .get(schoolController.listSchools);

module.exports = router;
