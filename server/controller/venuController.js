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

export const getVenue = async (req, res) => {
  try {
    const searchTerm = req.params.name;
    console.log("Search Term:", searchTerm);

    // Normalize the search term: convert to lowercase and remove spaces
    const normalizedSearchTerm = searchTerm.toLowerCase().replace(/\s+/g, "");
    console.log("Normalized Search Term:", normalizedSearchTerm);

    // Find the venue with a case-insensitive match for the normalized search term
    const venue = await Venue.aggregate([
      {
        $addFields: {
          normalizedName: { $toLower: { $trim: { input: "$name" } } },
        },
      },
      {
        $addFields: {
          normalizedName: {
            $replaceAll: {
              input: "$normalizedName",
              find: " ",
              replacement: "",
            },
          },
        },
      },
      {
        $match: {
          normalizedName: normalizedSearchTerm,
        },
      },
    ]);

    if (venue.length === 0) {
      return res.status(404).json({ message: "Venue Not Found" });
    }

    res.status(200).json(venue[0]);
  } catch (error) {
    console.error("Error getting venue:", error);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

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
