const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const auth = require('../middleware/auth'); // IMPORT BOUNCER

// 1. Specific route FIRST (PROTECTED)
router.get('/pending', auth, async (req, res) => {
  try {
    const pending = await Student.find({ isApproved: false });
    res.json(pending);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Public GET (Approved only) (PUBLIC)
router.get('/', async (req, res) => {
  try {
    const students = await Student.find({ isApproved: true });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Application POST (PUBLIC)
router.post('/', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 4. Approval PATCH (PROTECTED)
router.patch('/:id/approve', auth, async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, { isApproved: true });
    res.json({ message: "Mentor Approved!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Delete DELETE (PROTECTED)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Mentor removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;