const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const avilaAPI = require('./avilaAPI');

class AuthService {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || 'gabriela_secret_change_this';
        this.jwtExpiry = '7d';
    }

    // Register new user
    async register(userData) {
        const { name, email, password, phone, role = 'professional' } = userData;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email já cadastrado');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role
        });

        // Remove password from response
        const userObj = user.toObject();
        delete userObj.password;

        // Generate token
        const token = this.generateToken(userObj);

        // Sync with Avila API in background
        avilaAPI.syncClient({
            type: 'professional',
            name: user.name,
            email: user.email,
            phone: user.phone,
            source: 'gabriela'
        }).catch(err => console.warn('Sync failed:', err.message));

        return { user: userObj, token };
    }

    // Login
    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        if (!user.active) {
            throw new Error('Usuário inativo');
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Senha incorreta');
        }

        // Remove password from response
        const userObj = user.toObject();
        delete userObj.password;

        // Generate token
        const token = this.generateToken(userObj);

        return { user: userObj, token };
    }

    // Generate JWT token
    generateToken(user) {
        return jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            this.jwtSecret,
            { expiresIn: this.jwtExpiry }
        );
    }

    // Verify token
    verifyToken(token) {
        try {
            return jwt.verify(token, this.jwtSecret);
        } catch (error) {
            throw new Error('Token inválido ou expirado');
        }
    }

    // Middleware to protect routes
    authenticate(req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = this.verifyToken(token);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }
}

module.exports = new AuthService();
