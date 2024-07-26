import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    fieldData: {
      CreatedOn: {
        type: Date,
        default: Date.now,
      },
      UpdatedOn: {
        type: Date,
        default: Date.now,
      },

      minAge: {
        type: String,
      },
      "social-tw-link": {
        type: String,
        default: "",
      },
      "social-wt-link": {
        type: String,
        default: "",
      },
      "social-fb-link": {
        type: String,
        default: "",
      },
      startDate: {
        type: Date,
      },
      "social-other-link": {
        type: String,
        default: "",
      },
      recommend: {
        type: Boolean,
        default: false,
      },
      bali: {
        type: Boolean,
        default: false,
      },

      Ticketlink: {
        type: String,
        default: "",
      },
      venueName: {
        type: String,
        required: [true, "VaneuName is required"],
      },
      name: {
        type: String,
        required: [true, "Venu is required"],
      },
      neighborhood: {
        type: String,
      },
      currency: {
        type: String,
        default: "",
      },
      StartTime: {
        type: String,
        default: "",
      },
      genres1: {
        type: String,
      },
      genres2: {
        type: String,
      },
      recurring: {
        type: String,
      },

      valu: {
        type: String,
        default: "",
      },
      lineup2: {
        type: String,
        default: "",
      },
      EventsMap: {
        type: String,
        default: "",
      },

      VenueAddress: {
        type: String,
      },
      slug: {
        type: String,
        required: [true, "Slug is required"],
      },
      cities: {
        type: String,
      },
      promoterMail: {
        type: String,
        default: "",
      },
      meta: {
        type: String,
        default: "",
      },
      Main_Image: {
        type: String,
        required: [true, "Img is required"],
      },
      Image_Zapier_link: {
        type: String,
      },
      video: {
        url: {
          type: String,
          default: "",
        },
      },
      guestlist: {
        type: Boolean,
        default: false,
      },
      WebsiteURL: {
        type: String,
      },
      CatchVenues: {
        type: String,
      },
      Details: {
        type: String,
      },
      cost: {
        type: String,
      },
    },
  },

  { timestamps: true }
);

eventSchema.pre("save", function (next) {
  this.fieldData.UpdatedOn = Date.now();
  next();
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
