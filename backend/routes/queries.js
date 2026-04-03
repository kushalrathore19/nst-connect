const express = require('express');
const router = express.Router();
const Query = require('../models/Query');

router.post('/', async (req, res) => {
  try {
    const newQuery = new Query(req.body);
    const savedQuery = await newQuery.save();
    res.status(201).json(savedQuery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const queries = await Query.find();
    res.json(queries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.patch('/:id/status', async (req, res) => {
  try {
    const updatedQuery = await Query.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedQuery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;