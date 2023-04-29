const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
});

const RoomModel = mongoose.model("Room", roomSchema);

module.exports = RoomModel;
