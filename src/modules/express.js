const express = require("express");
const path = require("path");
const RoomModel = require("../models/roomPassword.model");

const app = express();
const port = 8080;
let passwordVerify = false;

app.use(express.static(path.join(__dirname, "/../../")));
app.use(express.static(path.join(__dirname, "../public/")));
app.use("/piano", express.static(path.join(__dirname, "../public/piano")));
app.use(express.json());

console.log(typeof RoomModel);
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../../index.html"));
});

app.post("/api/code", async (req, res) => {
  try {
    const code = req.body.code;
    const password = req.body.password;

    const room = await RoomModel.create(req.body);
    console.log(`Code: ${code}`);
    res.status(200).send("");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

app.get("/rooms/:code", async (req, res) => {
  try {
    const room = await RoomModel.findOne({ code: req.params.code });
    if (!room) {
      return res.status(404).send("Room not found");
    }
    if (!room.password || passwordVerify == true) {
      passwordVerify = false;
      return res.sendFile(path.join(__dirname, "../public/piano/piano.html"));
    }
    res.sendFile(path.join(__dirname, "../public/password.html"));
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/rooms/:codePass/password", async (req, res) => {
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
});

app.post("/api/rooms/verify", async (req, res) => {
  try {
    const enterCode = req.body.enterCode;

    const room = await RoomModel.findOne({ code: enterCode });

    if (!room) {
      res.status(404).send("Invalid code");
    } else {
      res.redirect(`/rooms/${enterCode}`);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running in ${port}.`);
});
