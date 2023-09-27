// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Create a task schema
const bmwschema = new mongoose.Schema({
  title: String,
  price: String,
  brand: String,
  rating: String,
  fual_type: String,
  engine: String,
  power_torque: String,
  seating: Number,
  img: String,
});

// Create a task model
const car = mongoose.model("car", bmwschema);

// Route to get all tasks
app.get("/user", async (req, res) => {
  try {
    const bmw1 = await car.find();
    res.json(bmw1);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving tasks" });
  }
});

//get a single car details
app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const singleCar = await car.findOne({ _id: id });
    res.json(singleCar);
    console.log("fetched");
  } catch (error) {
    res.status(500).json({ error: "Error retrieving tasks" });
  }
});

// Route to create a new task
app.post("/user", async (req, res) => {
  try {
    const bmwcar = new car(req.body);

    await bmwcar.save();
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
});
// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server listening on port 8000");
});

app.get("/", (req, res) => {
  res.send({
    name: "Ramesh",
  });
});
