require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET','POST','PUT','DELETE'],
}));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error("Error onnecting to  MongoDB:", err));

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
