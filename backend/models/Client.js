const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        sparse: true
    },
    birthdate: {
        type: Date
    },
    address: {
        street: String,
        number: String,
        complement: String,
        neighborhood: String,
        city: String,
        state: String,
        zipcode: String
    },
    notes: String,
    lastVisit: Date,
    totalSpent: {
        type: Number,
        default: 0
    },
    visitCount: {
        type: Number,
        default: 0
    },
    avilaClientId: String,
    tags: [String],
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    collection: 'clients'
});

clientSchema.index({ phone: 1 });
clientSchema.index({ email: 1 }, { sparse: true });
clientSchema.index({ avilaClientId: 1 }, { sparse: true });
clientSchema.index({ tags: 1 });

module.exports = mongoose.model('Client', clientSchema);
