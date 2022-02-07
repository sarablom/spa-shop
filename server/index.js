require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.REACT_APP_PORT || 8000;
const DATABASE_USER = process.env.REACT_APP_MONGOUSER;

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

console.log('port', DATABASE_USER);

// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get("/", (req, res) => {
//     res.send("Houston, we have succeeded")
// })

// app.get("/*", function (req, res) {
// 	res.sendFile(path.join(__dirname + "../client/build/index.html"));
// });

//Routes

app.use("/api/products", productRoutes);

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