import Trip from "../models/trip.js"; // Import Trip model

// Get all trips
export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trips" });
  }
};

// Create a new trip
export const createTrip = async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    console.log("newTrip", newTrip);
    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(400).json({ error: "Failed to create trip" });
  }
};

export const addDayToTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { dayNumber, date } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    // Convert to Date objects
    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);
    const selectedDate = new Date(date);

    // ✅ Ensure the date is within the trip duration
    if (selectedDate < startDate || selectedDate > endDate) {
      return res
        .status(400)
        .json({ message: "Date must be within the trip duration" });
    }

    // Ensure the day doesn't already exist
    if (trip.days.some((day) => day.date === date)) {
      return res
        .status(400)
        .json({ message: "This date is already added to the itinerary" });
    }

    // Add the new day
    trip.days.push({ dayNumber, date, itinerary: [] });
    await trip.save();

    res.status(201).json({ message: "Day added successfully", trip });
  } catch (error) {
    res.status(500).json({ message: "Error adding day", error: error.message });
  }
};


export const addItineraryToDay = async (req, res) => {
  try {
    const { tripId, dayNumber } = req.params;
    const { time, activity, location, notes } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    const day = trip.days.find((d) => d.dayNumber === Number(dayNumber));
    if (!day) return res.status(404).json({ message: "Day not found" });

    day.itinerary.push({ time, activity, location, notes });
    await trip.save();

    res.status(201).json({ message: "Itinerary added successfully", trip });
  } catch (error) {
    res.status(500).json({ message: "Error adding itinerary", error });
  }
};
