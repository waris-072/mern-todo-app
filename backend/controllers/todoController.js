const Todo = require("../models/Todo");

// GET
const getTodos = async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
};

// POST
const addTodo = async (req, res) => {
    const todo = await Todo.create({
        title: req.body.title
    });

    res.json(todo);
};

// DELETE
const deleteTodo = async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    res.json({
        message: "Deleted",
        data: todo
    });
};

// UPDATE
const updateTodo = async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        { title: req.body.title },
        { new: true }
    );

    res.json(todo);
};

// TOGGLE
const toggleTodo = async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
};

module.exports = {
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleTodo
};