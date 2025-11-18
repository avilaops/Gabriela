const express = require('express');
const { Client, Appointment, ProductSale } = require('../models');

const router = express.Router();

router.get('/stats', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        const [totalClients, vipClients, todayAppointments, pendingAppointments, monthlyRevenueData, dailyRevenueData, monthAppointments, noShows, popularServices, newClients] = await Promise.all([
            Client.countDocuments({ active: true }),
            Client.countDocuments({ totalSpent: { $gte: 500 }, active: true }),
            Appointment.countDocuments({ datetime: { $gte: today, $lt: tomorrow }, status: { $ne: 'cancelled' } }),
            Appointment.countDocuments({ datetime: { $gte: today }, status: { $in: ['scheduled', 'confirmed'] } }),
            Appointment.aggregate([{ $match: { datetime: { $gte: firstDayOfMonth }, paymentStatus: 'paid' } }, { $group: { _id: null, total: { $sum: '$price' } } }]),
            Appointment.aggregate([{ $match: { datetime: { $gte: today, $lt: tomorrow }, paymentStatus: 'paid' } }, { $group: { _id: null, total: { $sum: '$price' } } }]),
            Appointment.countDocuments({ datetime: { $gte: firstDayOfMonth } }),
            Appointment.countDocuments({ datetime: { $gte: firstDayOfMonth }, status: 'no_show' }),
            Appointment.aggregate([{ $match: { datetime: { $gte: firstDayOfMonth } } }, { $group: { _id: '$serviceId', bookings: { $sum: 1 }, revenue: { $sum: '$price' } } }, { $sort: { bookings: -1 } }, { $limit: 5 }, { $lookup: { from: 'services', localField: '_id', foreignField: '_id', as: 'service' } }, { $unwind: '$service' }, { $project: { name: '$service.name', price: '$service.price', bookings: 1, revenue: 1 } }]),
            Client.countDocuments({ createdAt: { $gte: firstDayOfMonth } })
        ]);

        res.json({
            clients: { total: totalClients, vip: vipClients, new_this_month: newClients },
            appointments: { today: todayAppointments, pending: pendingAppointments },
            revenue: { today: dailyRevenueData[0]?.total || 0, month: monthlyRevenueData[0]?.total || 0 },
            metrics: { no_show_rate: monthAppointments > 0 ? ((noShows / monthAppointments) * 100).toFixed(2) : 0 },
            popular_services: popularServices
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/financial', async (req, res) => {
    try {
        const { start_date, end_date } = req.query;
        if (!start_date || !end_date) return res.status(400).json({ error: 'start_date e end_date são obrigatórios' });

        const startDate = new Date(start_date);
        const endDate = new Date(end_date);
        endDate.setHours(23, 59, 59, 999);

        const [revenueByService, revenueByPaymentMethod, productSales, totalAppointmentRevenue, totalProductRevenue] = await Promise.all([
            Appointment.aggregate([{ $match: { datetime: { $gte: startDate, $lte: endDate }, paymentStatus: 'paid' } }, { $group: { _id: '$serviceId', total_appointments: { $sum: 1 }, total_revenue: { $sum: '$price' }, avg_ticket: { $avg: '$price' } } }, { $lookup: { from: 'services', localField: '_id', foreignField: '_id', as: 'service' } }, { $unwind: '$service' }, { $project: { name: '$service.name', total_appointments: 1, total_revenue: { $round: ['$total_revenue', 2] }, avg_ticket: { $round: ['$avg_ticket', 2] } } }, { $sort: { total_revenue: -1 } }]),
            Appointment.aggregate([{ $match: { datetime: { $gte: startDate, $lte: endDate }, paymentStatus: 'paid' } }, { $group: { _id: '$paymentMethod', transactions: { $sum: 1 }, total: { $sum: '$price' } } }]),
            ProductSale.aggregate([{ $match: { createdAt: { $gte: startDate, $lte: endDate }, paymentStatus: 'paid' } }, { $group: { _id: '$productId', sales_count: { $sum: 1 }, total_revenue: { $sum: '$totalPrice' } } }, { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } }, { $unwind: '$product' }, { $project: { name: '$product.name', type: '$product.type', sales_count: 1, total_revenue: { $round: ['$total_revenue', 2] } } }]),
            Appointment.aggregate([{ $match: { datetime: { $gte: startDate, $lte: endDate }, paymentStatus: 'paid' } }, { $group: { _id: null, total: { $sum: '$price' } } }]),
            ProductSale.aggregate([{ $match: { createdAt: { $gte: startDate, $lte: endDate }, paymentStatus: 'paid' } }, { $group: { _id: null, total: { $sum: '$totalPrice' } } }])
        ]);

        const appointmentsRevenue = totalAppointmentRevenue[0]?.total || 0;
        const productsRevenue = totalProductRevenue[0]?.total || 0;

        res.json({
            period: { start_date, end_date },
            total_revenue: { appointments: appointmentsRevenue, products: productsRevenue, grand_total: appointmentsRevenue + productsRevenue },
            revenue_by_service: revenueByService,
            revenue_by_payment_method: revenueByPaymentMethod,
            product_sales: productSales
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/inactive-clients', async (req, res) => {
    try {
        const days = parseInt(req.query.days) || 60;
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);

        const inactiveClients = await Client.aggregate([
            { $match: { active: true } },
            { $lookup: { from: 'appointments', localField: '_id', foreignField: 'clientId', as: 'appointments' } },
            { $addFields: { lastAppointment: { $max: '$appointments.datetime' } } },
            { $match: { $or: [{ lastAppointment: { $lt: cutoffDate } }, { lastAppointment: null }] } },
            { $project: { name: 1, phone: 1, email: 1, lastAppointment: 1 } },
            { $sort: { lastAppointment: -1 } }
        ]);

        res.json({ days, cutoff_date: cutoffDate.toISOString().split('T')[0], inactive_clients: inactiveClients });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
