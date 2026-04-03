const express = require('express');
const router = express.Router();
const Query = require('../models/Query');
const auth = require('../middleware/auth'); // IMPORT BOUNCER

// 1. Application POST (PUBLIC - Anyone can submit a query)
router.post('/', async (req, res) => {
  try {
    const newQuery = new Query(req.body);
    const savedQuery = await newQuery.save();
    res.status(201).json(savedQuery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Fetch all queries GET (PROTECTED - Admin only)
router.get('/', auth, async (req, res) => {
  try {
    const queries = await Query.find();
    res.json(queries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Update Status PATCH (PROTECTED - Admin only)
router.patch('/:id/status', auth, async (req, res) => {
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

// 4. Delete Query DELETE (PROTECTED - Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Query.findByIdAndDelete(req.params.id);
    res.json({ message: "Query deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;