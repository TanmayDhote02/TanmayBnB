const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const bookingController = require("../controllers/booking.js");
const { isLoggedIn } = require("../middleware.js");

// Route to handle booking instantly
router.post("/book", isLoggedIn, wrapAsync(bookingController.createBooking));

// Route to cancel a booking
router.delete("/bookings/:bookingId", isLoggedIn, wrapAsync(bookingController.destroyBooking));

module.exports = router;
