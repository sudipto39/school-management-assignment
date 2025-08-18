const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
// const db = require("./config/db");
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Server is listening");
});

const PORT = process.env.PORT;
console.log("hey i am port...", PORT);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});