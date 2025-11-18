const mongoose = require('mongoose');

const anamnesisSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    skinType: {
        type: String,
        enum: ['normal', 'dry', 'oily', 'combination', 'sensitive']
    },
    allergies: [String],
    medications: [String],
    skinConditions: [String],
    previousTreatments: String,
    concerns: String,
    expectations: String,
    contraindications: [String],
    consent: {
        type: Boolean,
        default: false
    },
    consentDate: Date,
    notes: String
}, {
    timestamps: true,
    collection: 'anamnesis'
});

anamnesisSchema.index({ clientId: 1 });

module.exports = mongoose.model('Anamnesis', anamnesisSchema);
