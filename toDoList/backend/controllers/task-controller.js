const Task = require('../models/task.model');

exports.addTask = (req, res, next) => {
    const task = new Task({
        body: req.body.body,
        isDone: req.body.isDone,
        deadline: req.body.deadline,
    });
    task.save()
        .then(() => {
            res.status(201).json({
                message: 'Task added',
            })
        }).catch(() => {
            res.status(500).json({
                message: 'Task could not be added'
            })
        })
}

exports.getAllTasks = (req, res, next) => {
    Task.find({})
        .then(documents => {
            res.status(200).json({
                message: 'Task fetched successfuly',
                tasks: documents,
            })
        }).catch(() => {
            res.status(500).json({
                message: 'Task fetching error'
            })
        })
}

exports.updateTask = (req, res, next) => {
    Task.updateOne({ _id: req.body.id }, req.body)
        .then(() => {
            res.status(200).json({
                message: 'Task updated successfuly',
            })
        }).catch(() => {
            res.status(500).json({
                message: 'Task could not be updated'
            })
        })

}

exports.delete = (req, res, next) => {
    Task.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: "Post deleted!" });
        }).catch(() => {
            res.status(500).json({
                message: 'Task could not be deleted'
            })
        })
}
