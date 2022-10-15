const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()
const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = jwt.verify(accessToken, `${process.env.JWT_TOKEN}`);
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

  const verifyTokenAndAdmin = (req, res, next) => {
    validateToken(req, res, () => {
      if (req.user.isAdmin || req.user.isCeo) {
        next();
      } else {
        res.json("You are not alowed to do that!");
      }
    });
  };
  
  


module.exports = {
        validateToken ,
        verifyTokenAndAdmin ,

    }