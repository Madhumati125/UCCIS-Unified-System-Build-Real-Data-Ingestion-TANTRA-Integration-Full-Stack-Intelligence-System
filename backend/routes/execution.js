const express = require("express");
const router = express.Router();

const { handleExecutionRequest } = require("../controllers/executionController");

// ✅ TANTRA HOOK ENDPOINT
router.post("/execution/request", handleExecutionRequest);

module.exports = router;