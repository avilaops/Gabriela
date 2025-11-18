const mongoose = require('mongoose');

const productSaleSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'credit', 'debit', 'pix', 'transfer'],
        default: 'cash'
    },
    validUntil: Date,
    sessionsRemaining: Number,
    notes: String
}, {
    timestamps: true,
    collection: 'product_sales'
});

productSaleSchema.index({ clientId: 1, createdAt: -1 });
productSaleSchema.index({ productId: 1 });

module.exports = mongoose.model('ProductSale', productSaleSchema);
