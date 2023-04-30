const express = require("express");
const router = express.Router();
const path = require("path");
const RoomController = require("../controllers/roomController");

router.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../../index.html"));
});

router.post("/api/code", RoomController.createRoom);

router.get("/:code", RoomController.getRoom);

router.post("/:codePass/password", RoomController.verifyPassword);

router.post("/api/rooms/verify", RoomController.verifyRoom);

module.exports = router;
