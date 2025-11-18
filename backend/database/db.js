const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log('✅ Usando conexão MongoDB existente');
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        isConnected = true;
        console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);

        mongoose.connection.on('error', (err) => {
            console.error('❌ Erro na conexão MongoDB:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️ MongoDB desconectado');
            isConnected = false;
        });

    } catch (error) {
        console.error('❌ Erro ao conectar MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = { connectDB, mongoose };
