const express = require('express');
const router = express.Router();
const Faq = require('../models/Faq');

router.get('/', async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const faqs = await Faq.find(filter);
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newFaq = new Faq(req.body);
    const savedFaq = await newFaq.save();
    res.status(201).json(savedFaq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;