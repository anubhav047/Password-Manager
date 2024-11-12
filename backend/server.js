const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const passwordRoutes = require('./routes/passwords');
const authRoutes = require('./routes/auth');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/passwords', passwordRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
