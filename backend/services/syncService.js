const { Client, Appointment, Product } = require('../models');
const avilaAPI = require('./avilaAPI');

class SyncService {
    constructor() {
        this.syncEnabled = process.env.SYNC_ENABLED !== 'false';
    }

    async syncClient(clientId) {
        if (!this.syncEnabled) return;

        try {
            const client = await Client.findById(clientId);
            if (!client) throw new Error('Cliente não encontrado');

            const result = await avilaAPI.syncClient({
                id: client._id.toString(),
                name: client.name,
                email: client.email,
                phone: client.phone,
                birthdate: client.birthdate,
                totalSpent: client.totalSpent,
                created_at: client.createdAt,
                source: 'gabriela'
            });

            console.log('✅ Cliente sincronizado com Avila API:', client.name);
            return result;
        } catch (error) {
            console.warn('⚠️ Falha ao sincronizar cliente:', error.message);
            return null;
        }
    }

    async syncAppointment(appointmentId) {
        if (!this.syncEnabled) return;

        try {
            const appointment = await Appointment.findById(appointmentId)
                .populate('clientId', 'name email phone')
                .populate('serviceId', 'name price duration');

            if (!appointment) throw new Error('Agendamento não encontrado');

            const result = await avilaAPI.syncAppointment({
                id: appointment._id.toString(),
                client: {
                    name: appointment.clientId.name,
                    email: appointment.clientId.email,
                    phone: appointment.clientId.phone
                },
                service: {
                    name: appointment.serviceId.name,
                    price: appointment.serviceId.price,
                    duration: appointment.serviceId.duration
                },
                datetime: appointment.datetime,
                status: appointment.status,
                price: appointment.price,
                paymentStatus: appointment.paymentStatus,
                created_at: appointment.createdAt,
                source: 'gabriela'
            });

            console.log('✅ Agendamento sincronizado com Avila API');
            return result;
        } catch (error) {
            console.warn('⚠️ Falha ao sincronizar agendamento:', error.message);
            return null;
        }
    }

    async syncProductsFromAvila() {
        if (!this.syncEnabled) return;

        try {
            const avilaProducts = await avilaAPI.getProducts();

            if (!avilaProducts || !avilaProducts.data) {
                console.log('Nenhum produto para sincronizar');
                return;
            }

            for (const avilaProduct of avilaProducts.data) {
                await this.importProduct(avilaProduct);
            }

            console.log(`✅ ${avilaProducts.data.length} produtos sincronizados da Avila API`);
        } catch (error) {
            console.warn('⚠️ Falha ao sincronizar produtos:', error.message);
        }
    }

    async importProduct(avilaProduct) {
        try {
            const existing = await Product.findOne({
                name: avilaProduct.name,
                type: avilaProduct.type || 'package'
            });

            if (existing) {
                await Product.findByIdAndUpdate(existing._id, {
                    description: avilaProduct.description,
                    price: avilaProduct.price
                });
                return { action: 'updated', id: existing._id };
            } else {
                const product = await Product.create({
                    name: avilaProduct.name,
                    type: avilaProduct.type || 'package',
                    description: avilaProduct.description,
                    price: avilaProduct.price,
                    active: true
                });
                return { action: 'created', id: product._id };
            }
        } catch (error) {
            console.error('Erro ao importar produto:', error.message);
            throw error;
        }
    }

    async sendContactToAvila(contactData) {
        if (!this.syncEnabled) return;

        try {
            const result = await avilaAPI.sendContact({
                ...contactData,
                source: 'gabriela',
                timestamp: new Date().toISOString()
            });

            console.log('✅ Contato enviado para Avila API');
            return result;
        } catch (error) {
            console.warn('⚠️ Falha ao enviar contato:', error.message);
            return null;
        }
    }
}

module.exports = new SyncService();
