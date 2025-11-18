const express = require('express');
const { Service } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const services = await Service.find({ active: true }).sort({ name: 1 });
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ error: 'Serviço não encontrado' });
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!service) return res.status(404).json({ error: 'Serviço não encontrado' });
        res.json(service);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
        if (!service) return res.status(404).json({ error: 'Serviço não encontrado' });
        res.json({ message: 'Serviço desativado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
