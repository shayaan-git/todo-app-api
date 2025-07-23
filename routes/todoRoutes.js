import express from 'express';
import Todo from '../models/todo.js'; // Use import and add .js extension
const router = express.Router(); // Create a new router instance

// Define routes for handling Todo items
router.post('/', async(req, res) => {
    try {
        const todoRoutes = new Todo({
            title: req.body.title, // Get the title from the request body
            completed: false // Set completed status to false by default
        })
        await todoRoutes.save(); // Save the new Todo item to the database
        res.status(201).json(todoRoutes); // Respond with the created Todo item
    } catch (error) {
        res.status(400).json({message: error.message}); // Respond with an error message if saving fails
    }
})

// Get all Todo items
router.get('/', async(req,res) => {
    try {
        const todos = await Todo.find(); // Fetch all Todo items from the database
        res.json({ todos, status: 'success', message: 'Todos fetched successfully' }); // Respond with the list of Todo items
    } catch (error) {
        res.status(500).json({message: error.message}); // Respond with an error message if fetching fails
    }
})
 
// Update a Todo item
router.put('/:id', async(req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Find the Todo item by ID
    if (!todo) return res.status(404).json({message: 'Todo not found'}); // Respond with 404 if not found

    // todo.completed = req.body.completed; // Update the completed status
    await todo.save(); // Save the updated Todo item
    res.json(todo); // Respond with the updated Todo item
    } catch (error) {
        res.status(400).json({message: error.message}); // Respond with an error message if updating fails
    }
})

// Delete a Todo item
router.delete('/:id', async(req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id); // Find and delete the Todo item by ID
        if (!todo) return res.status(404).json({message: 'Todo not found'}); // Respond with 404 if not found
        
        res.json({message: 'Todo deleted successfully'}); // Respond with success message
    }
    catch (error) {
        res.status(500).json({message: error.message}); // Respond with an error message if deletion fails
    }
});

export default router; // Use export default instead of module.exports