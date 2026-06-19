const express = require('express');
const auth = require('../middleware/auth');
const { getStudents, createStudent, updateStudent, deleteStudent } = require('../controllers/studentController');

const router = express.Router();
router.use(auth);

router.get('/', getStudents);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;