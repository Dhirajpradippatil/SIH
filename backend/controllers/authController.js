const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Function to create JWT token
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, // payload
    process.env.JWT_SECRET || "supersecretkey", // use env variable in production
    { expiresIn: "7d" }
  );
};

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({ name, email, password: hashed, role });

    // generate token
    const token = createToken(user);

    // send response
    res.status(201).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    // generate token
    const token = createToken(user);

    // send response
    res.status(200).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
