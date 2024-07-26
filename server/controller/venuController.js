//

import Venue from "../model/Venu.Modal.js";

//
export const getAllVenus = async (req, res) => {
  try {
    const venues = await Venue.find({});

    if (venues.length === 0) {
      res.status(200).json({ message: "No Venues Found" });
      return;
    }

    res.status(200).json(venues);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" + error });
  }
};

//
//
//
export const createVenue = async (req, res) => {
  try {
    const venue = new Venue(req.body);
    await venue.save();
    res.status(201).json(venue);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" + error });
  }
};
