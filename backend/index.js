require('dotenv').config();
const express = require('express');
const cors = require("cors");
const connection = require("./db");

const userRoutes = require('./routes/users'); 
const authRoutes = require("./routes/auth");

const app = express();


connection();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
