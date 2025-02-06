import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  time: String,
  activity: String,
  location: String,
  notes: String,
});

const daySchema = new mongoose.Schema({
  dayNumber: Number,
  date: { type: Date, required: true },
  itinerary: [itinerarySchema], // Each day has an array of itinerary items
});

const tripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  budget: { type: Number, required: true },
  days: [daySchema], // ⬅️ Added days array
});

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
