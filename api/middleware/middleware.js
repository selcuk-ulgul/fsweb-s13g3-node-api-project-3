const userDb = require("../users/users-model");

function logger(req, res, next) {
  const httpMethod = req.method;
  const url = req.originalUrl;
  const logTime = new Date().toISOString();
  const logMessage = `${httpMethod} - ${url} -${logTime}`;
  console.log(logMessage);
  next();
}

async function validateUserId(req, res, next) {
  const { id } = req.params;

  try {
    const user = await userDb.getById(id);
    if (!user || !id) {
      return res.status(404).json({ message: "User Not Found" });
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  const name = req.body.name?.trim();
  if (!name) {
    return res.status(400).json({ message: "gerekli name alanı eksik" });
  }
  req.body.name = name;
  next();
}

function validatePost(req, res, next) {
  const text = req.body.text?.trim();
  if (!text) {
    return res.status(400).json({ message: "gerekli text alanı eksik" });
  }
  req.body.text = text;
  next();
}
module.exports = { logger, validatePost, validateUser, validateUserId };
