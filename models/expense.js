import mongoose from "mongoose";

// Define the expense schema
const expenseSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip", // Refers to the "Trip" model, assuming you have this model created
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    merchant: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    paidBy: {
      type: String,
      required: false,
    },
    paymentMode: {
      type: String,
      required: false,
    },
    dateOfExpense: {
      type: Date,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    notes: {
      type: String,
      required: false,
    },
    expenseSplit: {
      type: String,
      required: false,
    },
    expenseType: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Optional: You can include this if you want createdAt/updatedAt fields
  }
);

// Create and export the Expense model
const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
