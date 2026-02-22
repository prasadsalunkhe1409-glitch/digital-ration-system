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
