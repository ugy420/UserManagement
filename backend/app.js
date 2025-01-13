import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import agencyRoutes from './routes/agencyRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use('/api', agencyRoutes);
app.use('/api', userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});