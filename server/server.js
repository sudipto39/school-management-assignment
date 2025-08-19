const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const schoolRoutes = require("./routes/schoolRoutes");

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,                              // 1 hour
  message: "Too many requests from this IP, please try again in an hour!"
});

app.use(express.json({ limit: "10kb" }));
app.use(cors());
app.use(morgan("dev"));
app.use("/api", limiter);

app.use("/api/v1/schools", schoolRoutes);

app.use(globalErrorHandler);

app.get("/", (req, res) => {
  res.send("Server is listening");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});