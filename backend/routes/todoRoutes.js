const express = require("express");
const router = express.Router();

const {
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleTodo
} = require("../controllers/todoController");

router.get("/", getTodos);
router.post("/", addTodo);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);
router.put("/toggle/:id", toggleTodo);

module.exports = router;

