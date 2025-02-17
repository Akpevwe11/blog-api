import express from 'express';
import dotenv, { config } from 'dotenv';
import  db from './config/db.js';
import auth from './middlewares/auth.js';
import authRoutes from './routes/auth.js';


const app = express();
dotenv.config();


// Middleware 
app.use(express.json());

// Routes 

app.use('/api/auth', authRoutes);




// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));