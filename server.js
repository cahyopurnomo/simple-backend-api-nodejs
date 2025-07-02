const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/user.routes');

const app = express();
app.use(cors());
app.use(express.json()); // Body parser

// Register routes
app.use('/api/users', userRoutes);

// 404 fallback untuk route yang tidak ditemukan
app.use((req, res, next) => {
   res.status(404).json({ message: 'Endpoint tidak ditemukan' });
});

// global error handler
app.use((err, req, res, next) => {
   console.error('Error:', err.stack);
   res.status(500).json({ message: 'Internal server error' });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`))