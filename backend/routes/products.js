const express = require('express');
const { Product, ProductSale, Client } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({ active: true }).populate('serviceIds', 'name price').sort({ name: 1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('serviceIds', 'name price');
        if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('serviceIds');
        if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
        if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
        res.json({ message: 'Produto desativado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/:id/sell', async (req, res) => {
    try {
        const { clientId, quantity = 1, paymentMethod = 'cash' } = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
        if (!product.active) return res.status(400).json({ error: 'Produto não está disponível' });

        const totalPrice = product.price * quantity;
        let validUntil = null;
        if (product.validityDays) {
            validUntil = new Date();
            validUntil.setDate(validUntil.getDate() + product.validityDays);
        }

        const sale = await ProductSale.create({
            productId: req.params.id,
            clientId,
            quantity,
            price: product.price,
            totalPrice,
            paymentMethod,
            paymentStatus: 'paid',
            validUntil,
            sessionsRemaining: product.sessions
        });

        if (clientId) await Client.findByIdAndUpdate(clientId, { $inc: { totalSpent: totalPrice } });
        if (product.stock > 0) await Product.findByIdAndUpdate(req.params.id, { $inc: { stock: -quantity } });

        const populated = await sale.populate(['productId', 'clientId']);
        res.status(201).json(populated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/sales/all', async (req, res) => {
    try {
        const sales = await ProductSale.find().populate('productId', 'name type price').populate('clientId', 'name phone email').sort({ createdAt: -1 });
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/sales/client/:clientId', async (req, res) => {
    try {
        const sales = await ProductSale.find({ clientId: req.params.clientId }).populate('productId', 'name type price').sort({ createdAt: -1 });
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
