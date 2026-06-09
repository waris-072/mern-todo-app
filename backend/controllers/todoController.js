const Todo = require("../models/Todo");  //schema for todo model

// GET
const getTodos = async (req, res) => {
    try{
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST
const addTodo = async (req, res) => {
    try {
        const todo = await Todo.create({
            title: req.body.title
        });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE
const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Deleted",
            data: todo
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE
const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        { title: req.body.title },
        { new: true }
    );

        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// TOGGLE
const toggleTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        todo.completed = !todo.completed;
        await todo.save();
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleTodo
};