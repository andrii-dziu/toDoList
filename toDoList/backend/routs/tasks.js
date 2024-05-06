const express = require('express');
const router = express.Router();
const TaskController = require("../controllers/task-controller")

router.post('', TaskController.addTask );
router.get('', TaskController.getAllTasks);
router.put('', TaskController.updateTask);
router.delete('/:id', TaskController.delete);

module.exports = router;
