// console.log("RUNNING SERVER FROM:", __dirname);

// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");

// // ===============================
// // CONFIG
// // ===============================
// dotenv.config();
// connectDB();

// const app = express();

// // ===============================
// // MIDDLEWARE
// // ===============================

// // CORS
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// // JSON parser
// app.use(express.json());

// // ===============================
// // ROUTES
// // ===============================

// // Auth
// app.use("/api/auth", require("./routes/authRoutes"));

// // Users
// app.use("/api/users", require("./routes/userRoutes"));

// // Ration Items (Admin)
// app.use("/api/ration-items", require("./routes/rationItemRoutes"));

// // Distributions (Dealer + Villager history)
// app.use("/api/distributions", require("./routes/distributionRoutes"));

// // Ration Cards
// app.use("/api/ration-cards", require("./routes/rationCardRoutes"));

// // Admin APIs
// app.use("/api/admin", require("./routes/adminRoutes"));

// // Dealer APIs
// app.use("/api/dealer", require("./routes/dealerRoutes"));

// //villager APIs
// app.use("/api/villager", require("./routes/villagerRoutes"));

// // ===============================
// // TEST ROUTE
// // ===============================
// app.get("/", (req, res) => {
//   res.send("Digital Ration System API is running");
// });

// // ===============================
// // SERVER START
// // ===============================
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



console.log("RUNNING SERVER FROM:", __dirname);

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/ration-items", require("./routes/rationItemRoutes"));
app.use("/api/distributions", require("./routes/distributionRoutes"));
app.use("/api/ration-cards", require("./routes/rationCardRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/dealer", require("./routes/dealerRoutes"));
app.use("/api/villager", require("./routes/villagerRoutes"));

app.get("/", (req, res) => {
  res.send("Digital Ration System API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
