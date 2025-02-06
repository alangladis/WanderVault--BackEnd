import Expense from "../models/expense.js"; // Adjust path as necessary
import mongoose from "mongoose";
export const addExpense = async (req, res) => {
  try {
    const {
      tripId,
      amount,
      currency,
      merchant,
      location,
      paidBy,
      paymentMode,
      dateOfExpense,
      paymentStatus,
      notes,
      expenseSplit,
      expenseType,
    } = req.body;
    console.log(
      "first",
      tripId,
      amount,
      currency,
      merchant,
      location,
      paidBy,
      paymentMode,
      dateOfExpense,
      paymentStatus,
      notes,
      expenseSplit,
      expenseType
    );
    // Validate if the trip exists (optional)
    // const trip = await Trip.findById(tripId); // If you're using MongoDB
    // if (!trip) {
    //   return res.status(404).json({ message: "Trip not found" });
    // }

    // Create the expense record
    const expense = await Expense.create({
      tripId,
      amount,
      currency,
      merchant,
      location,
      paidBy,
      paymentMode,
      dateOfExpense,
      paymentStatus,
      notes,
      expenseSplit,
      expenseType,
    });

    return res
      .status(201)
      .json({ message: "Expense added successfully", expense });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add expense", error });
  }
};


export const getExpense = async (req, res) => {
  try {
    const { tripId } = req.params; // Get tripId from URL params
    console.log("Received tripId:", tripId); // Debugging log

    if (!tripId) {
      return res.status(400).json({ error: "Trip ID is required" });
    }

    // Convert tripId to ObjectId correctly
    const objectId = new mongoose.Types.ObjectId(tripId); // Use 'new' here

    // Debugging: Log the objectId
    console.log("ObjectId:", objectId);

    // Fetch expenses for the specific trip
    const expenses = await Expense.find({ tripId: objectId });
    console.log("Expenses:", expenses); // Debugging log

    if (expenses.length === 0) {
      return res
        .status(404)
        .json({ message: "No expenses found for this trip" });
    }

    // Calculate the total amount spent on the trip
    const totalAmount = await Expense.aggregate([
      { $match: { tripId: objectId } }, // Match using ObjectId
      { $group: { _id: null, totalAmountSpent: { $sum: "$amount" } } }, // Sum the amount field
    ]);

    console.log("Total Amount Aggregated: ", totalAmount); // Debugging log

    // Return the expenses and the total amount spent
    res.json({
      expenses,
      totalAmountSpent:
        totalAmount.length > 0 ? totalAmount[0].totalAmountSpent : 0, // Safely handle aggregation result
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};
