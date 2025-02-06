// generateHash.js
import bcrypt from "bcryptjs";

const password = "alan"; // The plain text password
const saltRounds = 10; // Number of salt rounds

bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
  if (err) {
    console.error("Error hashing password:", err);
  } else {
    console.log("Hashed password:", hashedPassword); // This will print the hashed password to the console
  }
});
