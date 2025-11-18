const express = require('express');
const syncService = require('../services/syncService');
const avilaAPI = require('../services/avilaAPI');

const router = express.Router();

router.post('/client/:id', async (req, res) => {
    try {
        const result = await syncService.syncClient(req.params.id);
        res.json({ success: true, result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/appointment/:id', async (req, res) => {
    try {
        const result = await syncService.syncAppointment(req.params.id);
        res.json({ success: true, result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/products/import', async (req, res) => {
    try {
        await syncService.syncProductsFromAvila();
        res.json({ success: true, message: 'Produtos sincronizados com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/contact', async (req, res) => {
    try {
        const result = await syncService.sendContactToAvila(req.body);
        res.json({ success: true, result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/full', async (req, res) => {
    try {
        const results = { products: await syncService.syncProductsFromAvila(), message: 'Sincronização completa iniciada' };
        res.json({ success: true, results });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/status', async (req, res) => {
    try {
        const syncEnabled = process.env.SYNC_ENABLED === 'true';
        const avilaHealth = await avilaAPI.healthCheck();
        res.json({ sync_enabled: syncEnabled, avila_api_status: avilaHealth.status === 'ok' ? 'healthy' : 'unhealthy', avila_api: avilaHealth });
    } catch (error) {
        res.json({ sync_enabled: process.env.SYNC_ENABLED === 'true', avila_api_status: 'error', error: error.message });
    }
});

router.get('/health', async (req, res) => {
    try {
        const health = await avilaAPI.healthCheck();
        res.json({ avila_api: health, gabriela_api: { status: 'ok' } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
