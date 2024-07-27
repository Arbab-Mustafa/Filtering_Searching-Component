import mongoose from "mongoose";

const guestListSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
    },
    eventDate: {
      type: Date,
    },
    guests: [
      {
        name: String,
        email: String,
        city: String,
      },
    ],
  },
  { timestamps: true }
);

const GuestList = mongoose.model("GuestList", guestListSchema);

export default GuestList;
