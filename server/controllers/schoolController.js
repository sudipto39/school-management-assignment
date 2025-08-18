// const db = require("../config/db");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { query } = require("../config/db"); // use your exported query helper
// const calculateDistance = require("../utils/distanceCalculator"); 

exports.addSchool = catchAsync(async (req, res, next) => {
  const { name, address, latitude, longitude } = req.body;

  // Validation
  if (!name || !address || !latitude || !longitude) {
    return next(
      new AppError(
        "All fields (name, address, latitude, longitude) are required",
        400
      )
    );
  }

  // Insert school into database
  const insertSql = `
    INSERT INTO schools (name, address, latitude, longitude)
    VALUES (?, ?, ?, ?)
  `;

  const result = await query({
    query: insertSql,
    values: [name, address, latitude, longitude],
  });

  console.log("Result of raw SQL insert:", result);

  // Send response
  res.status(201).json({
    status: "success",
    message: "School added successfully",
    schoolId: result.insertId,
  });
});

// List schools (optionally sorted by distance if lat/lon provided by middleware)
exports.listSchools = catchAsync(async (req, res, next) => {
  // Fetch all schools from the database
  const selectAllSql = `SELECT * FROM schools`;
  const schools = await query({
    query: selectAllSql,
    values: [],
  });

  if (!schools || schools.length === 0) {
    return next(new AppError("No schools found", 404));
  }

  let finalSchools = schools;

  // If distanceCalculatorMiddleware has set req.distance, calculate distances
  if (req.distance) {
    finalSchools = schools.map((school) => ({
      ...school,
      distance: req.distance(school.latitude, school.longitude),
    }));

    // Sort by nearest first
    finalSchools.sort((a, b) => a.distance - b.distance);
  }

  res.status(200).json({
    status: "success",
    results: finalSchools.length,
    data: finalSchools,
  });
});