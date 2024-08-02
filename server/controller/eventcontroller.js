import Event from "../model/Event.Modal.js";

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    if (events.length === 0) {
      return res.status(404).json({ message: "No events found!" });
    }

    res.status(200).json(events);
  } catch (error) {
    console.log("Error getting all events:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found!" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.log("Error getting event by ID:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const createEvent = async (req, res) => {
  const newEvent = new Event({ fieldData: req.body.fieldData });
  console.log("New Event:", newEvent);

  try {
    const createdEvent = await newEvent.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    console.log("Error creating event:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const getEventByCity = async (req, res) => {
  const { city } = req.params; // Extract the city parameter from the route
  console.log("Searching for events in city:", city);

  try {
    // Query by the cities field
    const events = await Event.find({ "fieldData.cities": { $in: [city] } });

    console.log("Events found:", events);

    if (events.length === 0) {
      return res
        .status(404)
        .json({ message: "No events found for this city!" });
    }

    res.status(200).json(events);
  } catch (error) {
    console.log("Error getting events by city:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
