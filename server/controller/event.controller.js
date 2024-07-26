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
