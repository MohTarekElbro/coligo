const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Announcement name is required"],
      unique: [true, "Announcement name must be unique"],
      minlength: [3, "Too short Announcement name"],
      maxlength: [32, "Too long Announcement name"],
    },
    specialization: String,
    description: String,
  },
  { timestamps: true }
);

const AnnouncementModel = mongoose.model("Announcement", AnnouncementSchema);

module.exports = AnnouncementModel;
