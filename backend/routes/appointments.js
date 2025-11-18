const express = require('express');
const { Appointment, Client } = require('../models');
const syncService = require('../services/syncService');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { date, status } = req.query;
        const filter = {};
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);
            filter.datetime = { $gte: startDate, $lt: endDate };
        }
        if (status) filter.status = status;

        const appointments = await Appointment.find(filter)
            .populate('clientId', 'name phone email')
            .populate('serviceId', 'name duration price category')
            .populate('professionalId', 'name email')
            .sort({ datetime: -1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('clientId', 'name phone email')
            .populate('serviceId', 'name duration price category')
            .populate('professionalId', 'name email');
        if (!appointment) return res.status(404).json({ error: 'Agendamento não encontrado' });
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        await Client.findByIdAndUpdate(req.body.clientId, { $inc: { visitCount: 1 }, lastVisit: req.body.datetime });
        syncService.syncAppointment(appointment._id.toString()).catch(err => console.warn('Sync failed:', err.message));
        const populated = await appointment.populate(['clientId', 'serviceId', 'professionalId']);
        res.status(201).json(populated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .populate(['clientId', 'serviceId', 'professionalId']);
        if (!appointment) return res.status(404).json({ error: 'Agendamento não encontrado' });
        res.json(appointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate(['clientId', 'serviceId']);
        if (!appointment) return res.status(404).json({ error: 'Agendamento não encontrado' });
        if (status === 'completed' && appointment.paymentStatus === 'paid') {
            await Client.findByIdAndUpdate(appointment.clientId, { $inc: { totalSpent: appointment.price } });
        }
        res.json(appointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ error: 'Agendamento não encontrado' });
        res.json({ message: 'Agendamento removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/date/today', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const appointments = await Appointment.find({ datetime: { $gte: today, $lt: tomorrow } })
            .populate('clientId', 'name phone')
            .populate('serviceId', 'name duration')
            .sort({ datetime: 1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/date/upcoming', async (req, res) => {
    try {
        const now = new Date();
        const limit = parseInt(req.query.limit) || 10;
        const appointments = await Appointment.find({ datetime: { $gte: now }, status: { $in: ['scheduled', 'confirmed'] } })
            .populate('clientId', 'name phone')
            .populate('serviceId', 'name duration')
            .sort({ datetime: 1 })
            .limit(limit);
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
