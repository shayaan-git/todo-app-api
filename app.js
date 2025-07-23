// This line should be at the very top to ensure environment variables are available throughout the application
import "dotenv/config"; // Use the ES module version for dotenv
import express from "express"; // Import express
import mongoose from "mongoose"; // Import mongoose
import todoRouters from "./routes/todoRoutes.js"; // Import your router
import path from "path"; // Import path for handling file paths

// Notes: 📝
// app.js sets up the Express application, connects to MongoDB, and defines routes for handling todo items.
// app.js is the entry point of the application, initializing the server and connecting to the database.

// Create an instance of Express
const app = express();

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse JSON request bodies
app.use(express.json()); // Parse JSON bodies for incoming requests and make them available in req.body

// Connect to MongoDB using Mongoose
mongoose
.connect(process.env.MONGODB_URL)
.then(() => {
  console.log("Connected to MongoDB ✅");
}) // Log success message on connection
.catch((err) => console.error("MongoDB connection error:", err)); // Log error if connection fails

// Use the todo routes for handling requests to '/todos'
app.use("/todos", todoRouters);

// Define routes
const port = process.env.PORT || 3000; // Set the port number

// Root route now sends the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  // Start the server
  console.log(`Connecting to Database...`); // Log connection attempt
  console.log(`Server is running on http://localhost:${port}`); // Log server start message
});
