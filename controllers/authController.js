import bcrypt from "bcryptjs";
import { decryptData } from "../utils/decrpt.js";
import { User } from "../models/userModel.js";


export const login = async (req, res) => {
  try {
    const { encryptedData } = req.body;
    // Decrypt the data if encryption is being used
    const decryptedPassword = decryptData(encryptedData); // Replace with your actual decryption logic
    const { username, password } = decryptedPassword;
    // Find user by username in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid username " });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // If passwords match, return a success message
    return res.json({
      message: "Login successful",
      user: { username: user.username },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
};


export const signup = async (req, res) => {
  try {
    // Decrypt the password (if encrypted in the request)
    const decryptedPassword = decryptData(req.body.encryptedData);

    const username = decryptedPassword.formData.username;
    const password = decryptedPassword.formData.password;

    // Validate inputs
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document and save it to the database
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the new user
    await newUser.save();

    // Send success response
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};