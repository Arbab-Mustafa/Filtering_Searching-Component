import mongoose from "mongoose";

const venueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
    },

    createdOn: {
      type: Date,
      default: Date.now,
    },
    updatedOn: {
      type: Date,
      default: Date.now,
    },

    location: {
      type: String,
    },

    date: {
      type: Date,
    },
    time: {
      type: String,
      default: "",
    },
    details: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
    },
    eventAdmin: {
      type: String,
      default: "",
    },

    promoterLink: {
      type: String,
    },
    minAge: {
      type: String,
    },
    cost: {
      type: String,
    },
    mainImage: {
      type: String,
      required: [true, "Main Image is required"],
    },
    video: {
      type: String,
    },
    promoterMail: {
      type: String,
      default: "",
    },
    facebookLink: {
      type: String,
      default: "",
    },
    twitterLink: {
      type: String,
      default: "",
    },
    whatsappLink: {
      type: String,
      default: "",
    },
    venuesMap: {
      type: String,
    },

    venueMail: {
      type: String,
      default: "",
    },
    catchEvents: {
      type: String,
      default: "",
    },
    meta: {
      type: String,
      required: [true, "Meta is required"],
    },
  },
  { timestamps: true }
);

venueSchema.pre("save", function (next) {
  this.updatedOn = Date.now();
  next();
});

const Venue = mongoose.model("Venue", venueSchema);

export default Venue;
