const fetch = require('node-fetch');

const AVILA_API_BASE = 'https://api.avila.inc';
const AVILA_API_VERSION = 'v1';

class AvilaAPIService {
    constructor(apiKey = null) {
        this.apiKey = apiKey || process.env.AVILA_API_KEY;
        this.baseUrl = `${AVILA_API_BASE}/api/${AVILA_API_VERSION}`;
    }

    async request(endpoint, options = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (this.apiKey) {
            headers['Authorization'] = `Bearer ${this.apiKey}`;
        }

        const url = `${this.baseUrl}${endpoint}`;

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Avila API Error:', error.message);
            throw error;
        }
    }

    async healthCheck() {
        try {
            const response = await fetch(`${this.baseUrl}/health`);
            return await response.json();
        } catch (error) {
            return { status: 'error', message: error.message };
        }
    }

    async getProducts() {
        return this.request('/products');
    }

    async getProduct(id) {
        return this.request(`/products/${id}`);
    }

    async createProduct(productData) {
        return this.request('/products', {
            method: 'POST',
            body: JSON.stringify(productData)
        });
    }

    async updateProduct(id, productData) {
        return this.request(`/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(productData)
        });
    }

    async sendContact(contactData) {
        return this.request('/contact', {
            method: 'POST',
            body: JSON.stringify(contactData)
        });
    }

    async syncClient(clientData) {
        return this.request('/clients/sync', {
            method: 'POST',
            body: JSON.stringify({
                source: 'gabriela',
                client: clientData
            })
        });
    }

    async syncAppointment(appointmentData) {
        return this.request('/appointments/sync', {
            method: 'POST',
            body: JSON.stringify({
                source: 'gabriela',
                appointment: appointmentData
            })
        });
    }

    async getAnalytics(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/analytics${queryString ? '?' + queryString : ''}`);
    }
}

module.exports = new AvilaAPIService();
