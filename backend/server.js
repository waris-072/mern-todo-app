const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// connect MongoDB
connectDB();

const todoRoutes = require("./routes/todoRoutes");
app.use("/todos", todoRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});