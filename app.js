require('dotenv').config();
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const itemsRoutes = require('./routes/items');

const app = express();

// DB
mongoose.connect(process.env.DB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error.'));

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './frontend/build')));
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/items', itemsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/build', 'index.html'));
});

app.listen(process.env.PORT || 8080, console.log('Listening.'));
