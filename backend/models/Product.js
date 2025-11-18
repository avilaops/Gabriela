const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    type: {
        type: String,
        enum: ['package', 'product', 'gift_card'],
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    validityDays: {
        type: Number,
        min: 1
    },
    sessions: {
        type: Number,
        min: 1
    },
    serviceIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }],
    stock: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    collection: 'products'
});

productSchema.index({ type: 1, active: 1 });

module.exports = mongoose.model('Product', productSchema);
