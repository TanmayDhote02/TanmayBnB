const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "paid",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
