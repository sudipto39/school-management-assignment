const School = require("../models/schoolModel");

// Utility function to calculate distance
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Middleware to calculate distance to each school and sort by nearest
const calculatorDistanceMiddleware = async (req, res, next) => {
  try {
    const { lat, lon } = req.query; // user's current location

    if (!lat || !lon) {
      return res.status(400).json({ message: "Please provide lat and lon in query." });
    }

    const userLat = parseFloat(lat);
    const userLon = parseFloat(lon);

    // Fetch all schools from DB
    const schools = await School.find();

    // Calculate distance for each school
    const schoolsWithDistance = schools.map((school) => {
      const distance = calculateDistance(
        userLat,
        userLon,
        school.latitude,
        school.longitude
      );
      return { ...school.toObject(), distance }; // attach distance
    });

    // Sort by nearest distance
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    // Attach to req for controller
    req.schoolsWithDistance = schoolsWithDistance;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = calculatorDistanceMiddleware;
