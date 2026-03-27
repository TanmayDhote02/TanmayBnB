if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listingRouter = require("./routers/listing.js");
const reviewRouter = require("./routers/review.js");
const userRouter = require("./routers/user.js");
const profileRouter = require("./routers/profile.js");
const bookingRouter = require("./routers/booking.js");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


// ✅ Use MongoDB Atlas URL from environment
const DB_URL = process.env.MONGO_URL;

// ✅ Connect to DB
async function main() {
  await mongoose.connect(DB_URL);
}

main()
  .then(() => console.log("✅ Connected to DB"))
  .catch((err) => console.log(err));


// ✅ PORT FIX (6060 locally, Render compatible)
const PORT = process.env.PORT || 6060;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));


// ✅ Mongo Session Store
const store = MongoStore.create({
  mongoUrl: DB_URL,
  crypto: {
    secret: process.env.SECRET || "fallbacksecret",
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("❌ ERROR in MONGO SESSION STORE");
});

const sessionOptions = {
  store,
  secret: process.env.SECRET || "fallbacksecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());


// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Global variables
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});


// Routes
app.use("/", userRouter);
app.use("/profile", profileRouter);
app.use("/listings", listingRouter);
app.use("/listings/:id", bookingRouter);
app.use("/listings/:id/reviews", reviewRouter);


// 404 handler
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});


// Error handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("listings/error.ejs", { message });
});