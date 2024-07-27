import mongoose from "mongoose";

const masterEmailListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MasterEmailList = mongoose.model(
  "MasterEmailList",
  masterEmailListSchema
);

export default MasterEmailList;
