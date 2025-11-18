const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    duration: {
        type: Number,
        required: true,
        min: 15
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: ['sobrancelhas', 'cilios', 'depilacao', 'facial', 'corporal', 'outros'],
        default: 'sobrancelhas'
    },
    active: {
        type: Boolean,
        default: true
    },
    color: String
}, {
    timestamps: true,
    collection: 'services'
});

serviceSchema.index({ category: 1, active: 1 });

module.exports = mongoose.model('Service', serviceSchema);
