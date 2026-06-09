const express = require("express");
const router = express.Router();
const validateTodo = require("../middleware/todoValidation");

const {
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleTodo
} = require("../controllers/todoController");

router.get("/", getTodos);
router.post("/", validateTodo, addTodo);
router.delete("/:id", deleteTodo);
router.put("/:id", validateTodo, updateTodo);
router.put("/toggle/:id", toggleTodo);

module.exports = router;

