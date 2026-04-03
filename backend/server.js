const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const faqRoutes = require('./routes/faqs');
const studentRoutes = require('./routes/students');
const queryRoutes = require('./routes/queries');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nst_mvp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/faqs', faqRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/queries', queryRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});