const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const contactRoute = require('./routes/contatcRoutes')



const app = express();
dotenv.config();

connectDB();


app.use(cors());
app.use(express.json());




app.use('/api/v1', userRoutes);
app.use('/api/v1', contactRoute);
const port = 5000;
app.listen(port, () => {
    console.log('listening on port 5000');
})
