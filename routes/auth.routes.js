const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated");

// POST "/api/auth/signup" => Para registrar al usuario
router.post("/signup", async (req, res, next) => {
  // console.log(req.body);

  const {
    username,
    name,
    firstName,
    email,
    actualCity,
    dateOfBirth,
    password,
  } = req.body;

  if (
    !username ||
    !name ||
    !firstName ||
    !email ||
    !actualCity ||
    !dateOfBirth ||
    !password
  ) {
    res.status(400).json({ errorMessage: "LLena todos los campos " });
    return;
  }

  try {
    const foundUser = await User.findOne({ username: username });

    if (foundUser) {
      res.status(400).json({ errorMessage: "Usuario ya registrado" });
      return;
    }

    // encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // console.log(hashPassword)

    await User.create({
      username: username,
      name: name,
      firstName: firstName,
      actualCity: actualCity,
      dateOfBirth: dateOfBirth,
      email: email,
      password: hashPassword,
    });

    res.json("usuario creado");
  } catch (error) {
    next(error);
  }
});

// POST "/api/auth/login" => Validar las credenciales del usuario

router.post("/login", async (req, res, next) => {
  // console.log(req.body)
  const { username, password } = req.body;

  try {
    // Que el usuario exista
    const foundUser = await User.findOne({ username: username });
    if (!foundUser) {
      res
        .status(400)
        .json({ errorMessage: "Usuario no registrado con ese nombre" });
      return;
    }

    // Que la contraseña sea valida
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ errorMessage: "Contraseña no valida" });
      return;
    }

    // crear un token y se lo enviamos al cliente
    const payload = {
      _id: foundUser._id,
      username: foundUser.username,
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });

    res.json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

// GET "/api/auth/verify" => Indicarle al frontend si el usuario está logeado (validar)

router.get("/verify", isAuthenticated, (req, res, next) => {
  res.json({ payload: req.payload });
});

module.exports = router;
