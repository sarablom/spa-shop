require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.REACT_APP_PORT || 8000;
const DATABASE_USER = process.env.REACT_APP_MONGOUSER;

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/build")));

// app.get("/*", function (req, res) {
// 	res.sendFile(path.join(__dirname + "../client/build/index.html"));
// });

//Routes

app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/login", authRoutes);

//Error middleware

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}... 💻`);
});

mongoose.connect(`mongodb+srv://${DATABASE_USER}@spa-shop.qdnjm.mongodb.net/spa-shop`)
.then(() => {
    console.log("Conntected to database");
})
.catch((err) => {
    console.log("Error connecting to database", err);
})

module.exports = app;