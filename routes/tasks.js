const express = require('express')
const router = express.Router()

const api = require('../controllers/task')

router.get('/',api.getTask)
router.post('/',api.addNewTask)
router.patch('/',api.updateTask)
router.delete('/',api.deleteTask)

module.exports = router
