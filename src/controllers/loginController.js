const path = require("path");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

function generateToken(user) {
  const token = jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
}

const verifyLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({ email: email });

    if (!user || user.password !== password) {
      res.status(401).send("Invalid email or password");
    } else {
      const token = generateToken(user);

      return res.status(200).json({ token });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  verifyLogin,
  verifyToken,
};
