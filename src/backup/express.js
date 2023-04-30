const path = require("path");
const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const RoomModel = require("../models/roomPassword.model");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  pingTimeout: null,
});
const port = 8080;
let passwordVerify = false;

app.use(express.static(path.join(__dirname, "/../../")));
app.use(express.static(path.join(__dirname, "/../../src/public/")));
app.use(express.json());

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

app.get("/:code", async (req, res) => {
  try {
    const room = await RoomModel.findOne({ code: req.params.code });
    if (!room) {
      return res.status(404).send("Room not found");
    }
    if (!room.password || passwordVerify == true) {
      return res.sendFile(path.join(__dirname, "../../src/public/piano.html"));
    }

    res.sendFile(path.join(__dirname, "../public/password.html"));
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/:codePass/password", async (req, res) => {
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
      res.redirect(`/${enterCode}`);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/login", async (req, res) => {
  res.sendFile("../public/");
});

app.get("/register");
// Start server
server.listen(port, () => console.log(`Server is running on port ${port}`));
