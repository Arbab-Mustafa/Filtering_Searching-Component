import GuestList from "../model/GuestModel.js";

export const getAllEventGuests = async (req, res) => {
  try {
    const guestList = await GuestList.find();

    if (!guestList) {
      return res.status(404).json({ message: "No Guest List " });
    }

    res.status(200).json(guestList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createEventGuest = async (req, res) => {
  try {
    const { eventName, eventDate, guests } = req.body;

    const guestList = new GuestList({
      eventName,
      eventDate,
      guests,
    });

    await guestList.save();

    res.status(200).json(guestList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
