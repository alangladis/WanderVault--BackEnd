import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key"; // Use a more secure key in production

export const decryptData = (ciphertext) => {
  // Decrypt the ciphertext using CryptoJS with the same SECRET_KEY
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8); // Convert to UTF-8 string
  if (!decryptedData) {
    throw new Error("Failed to decrypt data");
  }
  return JSON.parse(decryptedData); // Assuming the data was a JSON string
};
