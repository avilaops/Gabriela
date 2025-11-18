const express = require('express');
const { Client, Appointment } = require('../models');
const syncService = require('../services/syncService');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const clients = await Client.find().sort({ createdAt: -1 });
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const client = await Client.create(req.body);
        syncService.syncClient(client._id.toString()).catch(err => console.warn('Sync failed:', err.message));
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!client) return res.status(404).json({ error: 'Cliente não encontrado' });
        res.json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
        if (!client) return res.status(404).json({ error: 'Cliente não encontrado' });
        res.json({ message: 'Cliente desativado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/filter/vip', async (req, res) => {
    try {
        const clients = await Client.find({ totalSpent: { $gte: 500 }, active: true }).sort({ name: 1 });
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id/history', async (req, res) => {
    try {
        const history = await Appointment.find({ clientId: req.params.id })
            .populate('serviceId', 'name price duration category')
            .populate('professionalId', 'name email')
            .sort({ datetime: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
