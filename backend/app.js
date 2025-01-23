import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import agencyRoutes from './routes/agencyRoutes.js';
import userRoutes from './routes/userRoutes.js';
import permissionRoutes from './routes/permissionRoutes.js'
import roleRoutes from './routes/roleRoutes.js';
import userRoleRoutes from './routes/userRoleRoutes.js';
import rolePermissionRoutes from './routes/rolePermissionRoutes.js';
import { authenticateToken } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/agencies', authenticateToken, agencyRoutes);
app.use('/api/permissions', authenticateToken, permissionRoutes);
app.use('/api/roles', authenticateToken, roleRoutes);
app.use('/api/userroles', authenticateToken, userRoleRoutes);
app.use('/api/rolepermissions', authenticateToken, rolePermissionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});