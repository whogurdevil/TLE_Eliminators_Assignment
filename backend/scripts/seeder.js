const mongoose = require("mongoose");
require("dotenv").config();
const Student = require("../models/Student");

const students = [
  {
    name: "Gurdev Singh",
    email: "gurdev@example.com",
    phone: "9876543210",
    cfHandle: "gurdev_singh",
    currentRating: 1450,
    maxRating: 1600
  },
  {
    name: "Riya Mehta",
    email: "riya@example.com",
    phone: "9123456780",
    cfHandle: "riya_coder",
    currentRating: 1200,
    maxRating: 1350
  },
  {
    name: "Aman Kumar",
    email: "aman@example.com",
    phone: "9988776655",
    cfHandle: "amanxD",
    currentRating: 1800,
    maxRating: 1850
  },
  {
    name: "Sneha Patel",
    email: "sneha@example.com",
    phone: "9345612789",
    cfHandle: "sneha_solve",
    currentRating: 1550,
    maxRating: 1580
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Student.deleteMany({});
    await Student.insertMany(students);
    console.log("🌱 Demo students seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seedDB();
