const express = require("express");
const ejs = require("ejs");
const path = require("path");
const RoomModel = require("../models/roomPassword.model");
const { appendFileSync } = require("fs");

const app = express();
const port = 8080;

let passwordVerify = false;

app.use(express.json());

app.post("/api/code", async (req, res) => {
  try {
    const code = req.body.code;
    const password = req.body.password;

    const room = await RoomModel.create(req.body);
    console.log(`Code: ${code}`);
    res.status(200).json({ message: "Code received successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

app.get("/rooms/:code", async (req, res) => {
  try {
    const room = await RoomModel.findOne({ code: req.params.code });
    if (!room) {
      return res.status(404).send("Sala não encontrada.");
    }
    if (!room.password || passwordVerify == true) {
      passwordVerify = false;
      return res.sendFile(path.join(__dirname, "../public/sala.html"));
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
      return res.status(404).send("Sala não encontrada.");
    }
    if (room.password !== passwordPass) {
      passwordVerify = false;
      return res.status(401).send("Senha incorreta.");
    }
    passwordVerify = true;
    res.redirect(`/rooms/${codePass}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ocorreu um erro interno no servidor.");
  }
});

app.listen(port, () => {
  console.log(`Server is running in ${port}.`);
});
