const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    professionalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    datetime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: 15
    },
    status: {
        type: String,
        enum: ['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'],
        default: 'scheduled'
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'partially_paid', 'refunded'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'credit', 'debit', 'pix', 'transfer'],
        default: 'cash'
    },
    notes: String,
    reminderSent: {
        type: Boolean,
        default: false
    },
    avilaAppointmentId: String
}, {
    timestamps: true,
    collection: 'appointments'
});

appointmentSchema.index({ clientId: 1, datetime: -1 });
appointmentSchema.index({ datetime: 1, status: 1 });
appointmentSchema.index({ professionalId: 1, datetime: 1 });
appointmentSchema.index({ avilaAppointmentId: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
