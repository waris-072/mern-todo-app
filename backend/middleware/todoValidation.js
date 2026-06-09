const validateTodo = (req, res, next) => {
    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    req.body.title = title.trim();
    next();
};

module.exports = validateTodo;