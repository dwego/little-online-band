const path = require("path");
const RoomModel = require("../models/roomPassword.model");

let passwordVerify = false;

const createRoom = async (req, res) => {
  try {
    const code = req.body.code;
    const password = req.body.password;

    const room = await RoomModel.create(req.body);
    console.log(`Code: ${code}`);
    res.status(200).send("");
  } catch (err) {
    console.error(err);
    errorLogStream.error(`LOG ${new Date()}: ERROR (500): ${err.message}`);
    res.status(500).send(err.message);
  }
};

const getRoom = async (req, res) => {
  try {
    const room = await RoomModel.findOne({ code: req.params.code });
    if (!room) {
      return res.status(404).send("Room not found");
    }
    if (!room.password || passwordVerify == true) {
      return res.sendFile(path.join(__dirname, "../../src/public/piano.html"));
    }

    res.sendFile(
      path.join(__dirname, "../../src/auth/rooms/roomPassword.html")
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const verifyPassword = async (req, res) => {
  try {
    const codePass = req.params.codePass;
    const passwordPass = req.body.passwordPass;

    const room = await RoomModel.findOne({ code: codePass });
    if (!room) {
      passwordVerify = false;
      res.status(404).send("Room not found.");
      return res.redirect(`/`);
    }
    if (room.password !== passwordPass) {
      passwordVerify = false;
      return res.status(401).send("Incorrect password.");
    }
    passwordVerify = true;
    res.redirect(`/rooms/${codePass}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("An internal server error has occurred.");
  }
};

const verifyRoom = async (req, res) => {
  try {
    const enterCode = req.body.enterCode;

    const room = await RoomModel.findOne({ code: enterCode });

    if (!room) {
      res.status(404).send("Invalid code");
    } else {
      res.redirect(`/${enterCode}`);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  createRoom,
  getRoom,
  verifyPassword,
  verifyRoom,
};
