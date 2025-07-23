import mongoose from 'mongoose'; // Import Mongoose for MongoDB interaction
const todoSchema = new mongoose.Schema({ // Define the schema for the Todo model
    title: { type: String,
        required: true }, // Title of the todo item
        completed: Boolean, // Completion status of the todo item
    });

   export default mongoose.model('Todo', todoSchema); // Export the Todo model based on the schema
// This allows other files to import and use the Todo model for database operations
