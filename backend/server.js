const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./database/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar ao MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
const clientsRouter = require('./routes/clients');
const servicesRouter = require('./routes/services');
const appointmentsRouter = require('./routes/appointments');
const productsRouter = require('./routes/products');
const dashboardRouter = require('./routes/dashboard');
const authRouter = require('./routes/auth');
const syncRouter = require('./routes/sync');

app.use('/api/auth', authRouter);
app.use('/api/sync', syncRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/products', productsRouter);
app.use('/api/dashboard', dashboardRouter);

// Rota de health check
app.get('/health', async (req, res) => {
    const mongoose = require('mongoose');
    res.json({
        status: 'OK',
        message: 'Gabriela API está funcionando!',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Rota raiz
app.get('/', (req, res) => {
    res.json({
        message: 'Bem-vinda ao Gabriela Backend API',
        version: '1.0.0',
        database: 'MongoDB Atlas',
        avila_integration: true,
        endpoints: {
            auth: '/api/auth',
            sync: '/api/sync',
            clients: '/api/clients',
            services: '/api/services',
            appointments: '/api/appointments',
            products: '/api/products',
            dashboard: '/api/dashboard'
        }
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Algo deu errado!',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
});

module.exports = app;
