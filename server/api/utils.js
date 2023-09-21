const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets");

const authRequired = (req, res, next) => {
  const token = req.signedCookies.token;
  console.log("Cookie Token:", token);

  try {
    jwt.verify(token, JWT_SECRET);
  } catch (error) {
    res.status(401).send({
      message: " You cant sit with us",
      loggedIn: false,
    });
    return;
  }
  next();
};

module.exports = { authRequired };
