// This line should be at the very top to ensure environment variables are available throughout the application
import "dotenv/config"; // Use the ES module version for dotenv
import express from "express"; // Import express
import mongoose from "mongoose"; // Import mongoose
import todoRouters from "./routes/todoRoutes.js"; // Import your router

// Notes: 📝
// app.js sets up the Express application, connects to MongoDB, and defines routes for handling todo items.
// app.js is the entry point of the application, initializing the server and connecting to the database.

// Create an instance of Express
const app = express();

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

app.get("/", (req, res) => {
  // This is a basic route handler for the homepage
  res.send(`
    <html>
  <head>
    <title>Todo App API</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <main class="container">
      <h1>Welcome to ToDo App! 📝</h1>
      <p>Welcome! Use the following endpoints to interact with the Todo API:</p>
      <ul>
        <li>
          <span class="endpoint get">GET</span>
          <code>/todos</code>
          <span class="description">- List all todos</span>
        </li>
        <li>
          <span class="endpoint get">GET</span>
          <code>/todos/:id</code>
          <span class="description">- Get a todo by ID</span>
        </li>
        <li>
          <span class="endpoint post">POST</span>
          <code>/todos</code>
          <span class="description">- Create a new todo (JSON body)</span>
        </li>
        <li>
          <span class="endpoint put">PUT</span>
          <code>/todos/:id</code>
          <span class="description">- Update a todo by ID (JSON body)</span>
        </li>
        <li>
          <span class="endpoint delete">DELETE</span>
          <code>/todos/:id</code>
          <span class="description">- Delete a todo by ID</span>
        </li>
      </ul>
      <p>Try it out with a tool like <a href="https://www.postman.com/" target="_blank">Postman</a> or <a href="https://www.insomnia.rest/" target="_blank">Insomnia</a>.</p>
    </main>
  </body>
</html>
  `); // Respond with a simple HTML page
});
app.listen(port, () => {
  // Start the server
  console.log(`Connecting to Database...`); // Log connection attempt
  console.log(`Server is running on http://localhost:${port}`); // Log server start message
});
