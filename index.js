const express = require("express");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 8000;
const productRoutes = require("./routes/productRoutes")

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes

app.get("/", (req, res) => {
    res.send("Houston, we have succeeded")
})

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}... 💻`);
});