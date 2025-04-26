const Todo = require('../models/Todo.js');
const ApiError = require('../utils/ApiError.js')
const ApiResponse = require('../utils/ApiResponse.js')
const asyncHandler = require('../utils/asyncHandler.js')


// CREATE a new todo
exports.createTodo = asyncHandler(async (req, res) => {
    try {
        const newTodo = new Todo({ text: req.body.text });
        if (!newTodo.text) {
            throw new ApiError(400, 'Todo text is required ')
        }
        const savedTodo = await newTodo.save();
        return res.status(201)
            .json(
                new ApiResponse(
                    201,
                    "Todo created successfully",
                    savedTodo
                )
            )

    } catch (error) {
        throw new ApiError(500, error?.message || 'Internal server error')
    }
});


// GET all todos
exports.getTodos = asyncHandler(async (req, res) => {

    try {
        const todos = await Todo.find().sort('-createdAt');

        return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    "Todos fetched successfully",
                    todos
                )
            )
    } catch (error) {
        throw new ApiError(500, error?.message || "Internal sever error")
    }
});

// DELETE a todo
exports.deleteTodo = asyncHandler(async (req, res) => {
    try {
        const Todo = await Todo.findByIdAndDelete(req.params.id);
        if (!Todo) {
            throw new ApiError(404, 'Todo not found')
        }
        return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    "Todo deleted successfully",
                    Todo
                )
            )
    } catch (error) {
        throw new ApiError(500, error?.message || 'Internal server error')
    }
});

// TOGGLE a todo's completion status
exports.toggleTodo = asyncHandler(async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        todo.completed = !todo.completed;
        await todo.save();

        return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    "Todo updated successfully",
                    todo
                )
            );

    } catch (error) {
        res.status(500).json({ message: 'Server error' });

    }
}); 
