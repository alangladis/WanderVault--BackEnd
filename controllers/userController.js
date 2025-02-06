import { User } from "../models/userModel.js"; // Correct import for a named export
import bcrypt from "bcryptjs";

// Create a new user
export const createUser = async (req, res) => {
  const { username, email, password, phoneNumber, address, role } = req.body;

  console.log(req.body); // Log the incoming data
 const hashedPassword = await bcrypt.hash(password, 10);
  // Create a new user document
  const newUser = new User({
    username,
    email,
    hashedPassword,
    phoneNumber,
    address,
    role,
  });

  try {
    // Save the user to the database
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ error: "Error creating user", details: error });
  }
};

// Get total number of users
export const getTotalUsers = async (req, res) => {
  try {
    // Get the total number of users in the database
    const userCount = await User.countDocuments();

    res.status(200).json({ totalUsers: userCount });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving user count", details: error });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users", details: error });
  }
};
