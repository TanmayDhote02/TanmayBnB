//const Booking = require("../models/booking");
const Listing = require("../models/listing");

module.exports.createBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);

        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }

        const newBooking = new Booking({
            user: req.user._id,
            listing: listing._id,
            price: listing.price,
            status: "paid", // Instant mock booking
        });
        await newBooking.save();

        req.flash("success", "Booking confirmed! (Mock transaction successful)");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        next(err);
    }
};
