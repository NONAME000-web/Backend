const express = require('express');
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Izinkan semua origin (sementara untuk development)
app.use(cors());

const userRoutes = require('./routes/users');
const devRoutes = require('./routes/developers')
const gameRoutes = require('./routes/games')

app.use(express.json());

app.use('/user', userRoutes);
app.use('/dev', devRoutes)
app.use('/games', gameRoutes)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})