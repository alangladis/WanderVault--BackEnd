import express from "express";
import { getTrips, createTrip, addDayToTrip, addItineraryToDay } from "../controllers/tripController.js"; // Import controller functions

const router = express.Router();

// Define routes
router.get("/getTrips", getTrips);
router.post("/createTrip", createTrip);
router.post("/:tripId/days", addDayToTrip); // Add a day to a trip
router.post("/:tripId/days/:dayNumber/itinerary", addItineraryToDay); // Add itinerary to a day
export default router; // Ensure it's a default export