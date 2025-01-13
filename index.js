const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/web-development-plan', require('./routes/webDevelopmentPlanRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/team', require('./routes/teamRoutes'));
app.use('/api/about', require('./routes/aboutRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/planbookings', require('./routes/planbookingRoutes'));
app.use('/api/careers', require('./routes/careerRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
