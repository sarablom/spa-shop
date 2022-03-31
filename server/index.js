require("dotenv").config();
const cors = require("cors");
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitizer = require("express-mongo-sanitize");
const xss = require("xss-clean");
const path = require("path");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || process.env.REACT_APP_PORT || 8000;
const DATABASE_USER = process.env.REACT_APP_MONGOUSER;

const app = express();

//Middlewares
app.use(helmet());
app.use(cors());
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!"
  });
  
app.use("/api", limiter);
app.use(express.json());
app.use(mongoSanitizer());
app.use(xss());

//Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/login", authRoutes);
app.use("/api/order", orderRoutes);

app.use(express.static(path.join(__dirname, "/../client/build")));

// Wild card routing - has to be the last of the routes
app.get("/*", function (req, res) {
res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

//Error middleware

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}... 💻`);
});

mongoose.connect(`mongodb+srv://${DATABASE_USER}@spa-shop.qdnjm.mongodb.net/spa-shop`)
.then(() => {
    console.log("Connected to database");
})
.catch((err) => {
    console.log("Error connecting to database", err);
})

module.exports = app;