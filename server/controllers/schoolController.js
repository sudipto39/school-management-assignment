// const db = require("../config/db");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { query } = require("../config/db"); // use your exported query helper
// const calculateDistance = require("../utils/distanceCalculator"); 

exports.addSchool = catchAsync(async (req, res, next) => {
  const { school_name, school_address, latitude, longitude } = req.body;

  // Validation
  if (!school_name || !school_address || !latitude || !longitude) {
    return next(
      new AppError(
        "All fields (school_name, school_address, latitude, longitude) are required",
        400
      )
    );
  }

  // Insert school into database
  const insertSql = `
  INSERT INTO schools (school_name, school_address, latitude, longitude)
  VALUES (?, ?, ?, ?)
`;

  const result = await query({
    query: insertSql,
    values: [school_name, school_address, latitude, longitude],
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
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  if (isNaN(userLat) || isNaN(userLon)) {
    return next(new AppError("Please provide valid latitude and longitude as query parameters", 400));
  }

  // Fetch all schools from the database
  const selectAllSql = `SELECT * FROM schools`;
  const schools = await query({
    query: selectAllSql,
    values: [],
  });

  if (!schools || schools.length === 0) {
    return next(new AppError("No schools found", 404));
  }

  // Calculate distance for each school
  const calculateDistance = require("../utils/distanceCalculator");
  const schoolsWithDistance = schools.map((school) => ({
    ...school,
    distance: calculateDistance(userLat, userLon, school.latitude, school.longitude),
  }));

  // Sort by nearest first
  schoolsWithDistance.sort((a, b) => a.distance - b.distance);

  res.status(200).json({
    status: "success",
    results: schoolsWithDistance.length,
    data: schoolsWithDistance,
  });
});
