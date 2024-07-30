import mongoose from "mongoose";

const venueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    slug: {
      type: String,
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
    },
  },
  { timestamps: true }
);

venueSchema.pre("save", function (next) {
  this.updatedOn = Date.now();

  // Generate slug if not provided
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }

  // Generate meta if not provided
  if (!this.meta && this.name) {
    this.meta = `Wild & Free - ${this.name}`;
  }

  next();
});

const Venue = mongoose.model("Venue", venueSchema);

export default Venue;
