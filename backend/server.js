const express = require("express");
const cors = require("cors");

const zoneRoutes = require("./routes/zones");
const executionRoutes = require("./routes/execution");
const snapshotRoutes = require("./routes/snapshot");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ROUTES
app.use("/api", zoneRoutes);
app.use("/api", executionRoutes);
app.use("/api", snapshotRoutes);

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});