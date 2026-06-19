const Student = require('../models/Student');

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find({ user: req.userId }).sort('-createdAt');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create({ ...req.body, user: req.userId });
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!student) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!student) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json({ message: 'Aluno removido' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};