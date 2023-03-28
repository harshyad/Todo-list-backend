const Task = require('../models/task_models')
const mongoose = require('mongoose')
const joi = require("joi")
const TaskSchema = joi.object({
    id: joi.string().required(),
    name: joi.string().required().max(20),
    completed: joi.boolean().required()
})
const getTask = async (req, res) => {
    if (req.query.id) {
        try {
            const task = await Task.findById(req.query.id)
            if (task) {
                res.status(200).json(task)
            }
            else {
                res.status(404).json({ "msg": "User Not Found" })
            }

        } catch (err) {
            res.status(500).json({ "msg": err })
        }
    }
    else {
        try {
            const allTask = await Task.find()
            res.status(200).json({ allTask })
        } catch (err) {
            res.status(500).json({ "msg": err })
        }
    }

}
const addNewTask = async (req, res) => {
    try {
        const name = await Task.find({ "name": req.body.name.toLowerCase() })
        if (name.length == 0) {
            req.body.name = req.body.name.toLowerCase()
            const task = await Task.create(req.body)
            res.status(201).json({ task })
        }
        else {
            res.json({ "msg": "User already exist" })
        }
    } catch (err) {
        res.status(500).json({ "msg": err })
    }
}

const updateTask = async (req, res) => {
    try {
        const { error, value } = TaskSchema.validate(req.body)
        if (error) {
            return res.status(500).json({ "msg": error })
        }
        else if (req.body.name.trim()) {
            const { id, name, completed } = req.body;
            const task = await Task.findByIdAndUpdate(id, { "name": name, "completed": completed }, { new: true })
            if (task) {
                res.status(201).json({ task, "msg": "done" })
            }
            else {
                res.status(404).json({ "msg": "User Not Found" })
            }
        }
        else {
            res.status(500).json({ "msg": "Please enter valid name" })
        }
    } catch (err) {
        res.status(500).json({ "msg": err })
    }
}
const deleteTask = async (req, res) => {
    try {
        if (req.query.id) {
            const id = req.query.id
            const task = await Task.findByIdAndRemove(id)
            if (task) {
                res.status(201).json({ task, "msg": "done" })
            }
            else {
                res.status(404).json({ "msg": "User Not Found" })
            }
        }
    } catch (err) {
        res.status(500).json({ "msg": err })
    }
}

module.exports = {
    getTask,
    addNewTask,
    updateTask,
    deleteTask,
}