const express = require("express");

const app = express();
const port = 8080;

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    res.sendFile("index");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/code", async (req, res) => {
  try {
    const code = await req.body.code;
    console.log(`Code: ${code}`);
    res.status(200).send("Code received successfully.");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/:code", async (req, res) => {
  try {
    const code = req.params.code;
    res.status(200).send(`Room code:${code}.`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running in ${port}.`);
});
