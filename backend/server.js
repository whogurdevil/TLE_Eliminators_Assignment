const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const studentRoutes = require("./routes/studentRoutes");
const codeforcesRoutes = require("./routes/codeforces");
app.use("/api/codeforces", codeforcesRoutes);
app.use("/api/students", studentRoutes);
app.get("/", (req, res) => res.send("API is working"));
const cronRoutes = require('./routes/cronRoutes');
app.use('/api/cron', cronRoutes);



require("./cron/UpdatedataCron")

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT,'0.0.0.0', () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error("MongoDB Error:", err));
