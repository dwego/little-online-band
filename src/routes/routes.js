const path = require("path");
const express = require("express");
const loginRoutes = require("./loginRoutes");
const roomRoutes = require("./roomRoutes");
const LoginController = require("../controllers/loginController");
const RoomController = require("../controllers/roomController");
const router = express.Router();

router.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.post("/api/code", RoomController.createRoom);

router.get("/:code", RoomController.getRoom);

router.post("/:codePass/password", RoomController.verifyPassword);

router.post("/api/rooms/verify", RoomController.verifyRoom);

router.post("/api/login", LoginController.verifyLogin);

module.exports = router;
