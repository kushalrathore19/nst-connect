const express = require('express');
const router = express.Router();
const Faq = require('../models/Faq');
const auth = require('../middleware/auth'); // IMPORT BOUNCER

// 1. Fetch FAQs GET (PUBLIC - Anyone can view FAQs)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const faqs = await Faq.find(filter);
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Create FAQ POST (PROTECTED - Admin only)
router.post('/', auth, async (req, res) => {
  try {
    const newFaq = new Faq(req.body);
    const savedFaq = await newFaq.save();
    res.status(201).json(savedFaq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Delete FAQ DELETE (PROTECTED - Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.json({ message: "FAQ deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;