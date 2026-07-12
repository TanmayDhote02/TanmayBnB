const Booking = require("../models/booking");
const Listing = require("../models/listing");

module.exports.createBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);

        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }

        const { name, phone, checkIn, checkOut, guests } = req.body.booking;

        if (!name || !phone || !checkIn || !checkOut || !guests) {
            req.flash("error", "Please fill in all booking details!");
            return res.redirect(`/listings/${id}`);
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        
        // Basic date validation
        if (checkInDate < new Date().setHours(0, 0, 0, 0)) {
            req.flash("error", "Check-in date cannot be in the past!");
            return res.redirect(`/listings/${id}`);
        }

        if (checkOutDate <= checkInDate) {
            req.flash("error", "Check-out date must be after check-in date!");
            return res.redirect(`/listings/${id}`);
        }

        const timeDiff = checkOutDate - checkInDate;
        const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        const totalPrice = nights * listing.price;

        const newBooking = new Booking({
            user: req.user._id,
            listing: listing._id,
            name,
            phone,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            guests: Number(guests),
            price: listing.price,
            totalPrice,
            status: "confirmed",
        });

        await newBooking.save();

        req.flash("success", `Booking confirmed! Total price: \u20B9${totalPrice.toLocaleString("en-IN")}`);
        res.redirect(`/listings/${id}`);
    } catch (err) {
        next(err);
    }
};

module.exports.destroyBooking = async (req, res, next) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            req.flash("error", "Booking not found!");
            return res.redirect("/profile");
        }

        // Check ownership
        if (!booking.user.equals(req.user._id)) {
            req.flash("error", "You do not have permission to cancel this booking!");
            return res.redirect("/profile");
        }

        await Booking.findByIdAndDelete(bookingId);
        req.flash("success", "Booking canceled successfully!");
        res.redirect("/profile");
    } catch (err) {
        next(err);
    }
};
