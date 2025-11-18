const dotenv = require('dotenv');
const { connectDB } = require('./db');
const { Service, Product, User } = require('../models');
const bcrypt = require('bcryptjs');

dotenv.config();

const seedDatabase = async () => {
    try {
        console.log('🌱 Iniciando seed do banco de dados...');

        await connectDB();

        // Limpar dados existentes (cuidado em produção!)
        if (process.env.NODE_ENV === 'development') {
            await Service.deleteMany({});
            await Product.deleteMany({});
            await User.deleteMany({});
            console.log('🗑️ Dados antigos removidos');
        }

        // Criar usuário admin
        const hashedPassword = await bcrypt.hash('gabriela2025', 10);
        const adminUser = await User.create({
            email: 'admin@gabriela.com',
            password: hashedPassword,
            name: 'Gabriela Administrador',
            role: 'admin'
        });
        console.log('👤 Usuário admin criado');

        // Criar serviços
        const services = await Service.insertMany([
            {
                name: 'Design de Sobrancelhas',
                description: 'Modelagem e design profissional das sobrancelhas',
                duration: 45,
                price: 60.00,
                category: 'sobrancelhas',
                color: '#8B4513'
            },
            {
                name: 'Brow Lamination',
                description: 'Laminação de sobrancelhas para efeito natural e duradouro',
                duration: 60,
                price: 120.00,
                category: 'sobrancelhas',
                color: '#A0522D'
            },
            {
                name: 'Nanofios',
                description: 'Técnica de micropigmentação fio a fio',
                duration: 90,
                price: 350.00,
                category: 'sobrancelhas',
                color: '#D2691E'
            },
            {
                name: 'Henna',
                description: 'Coloração natural com henna para sobrancelhas',
                duration: 45,
                price: 55.00,
                category: 'sobrancelhas',
                color: '#CD853F'
            },
            {
                name: 'Lifting de Cílios',
                description: 'Curvatura e volume natural dos cílios',
                duration: 60,
                price: 90.00,
                category: 'cilios',
                color: '#DEB887'
            },
            {
                name: 'Extensão de Cílios',
                description: 'Aplicação de fios sintéticos para volume e comprimento',
                duration: 120,
                price: 180.00,
                category: 'cilios',
                color: '#F4A460'
            }
        ]);
        console.log(`✅ ${services.length} serviços criados`);

        // Criar produtos/pacotes
        const products = await Product.insertMany([
            {
                name: 'Pacote 5 Sessões - Design',
                description: 'Pacote com 5 sessões de design de sobrancelhas com desconto',
                type: 'package',
                price: 270.00,
                validityDays: 180,
                sessions: 5,
                serviceIds: [services[0]._id]
            },
            {
                name: 'Pacote 3 Sessões - Henna',
                description: 'Pacote com 3 aplicações de henna',
                type: 'package',
                price: 150.00,
                validityDays: 90,
                sessions: 3,
                serviceIds: [services[3]._id]
            },
            {
                name: 'Vale Presente R$ 100',
                description: 'Cartão presente no valor de R$ 100 para qualquer serviço',
                type: 'gift_card',
                price: 100.00,
                validityDays: 365
            },
            {
                name: 'Vale Presente R$ 200',
                description: 'Cartão presente no valor de R$ 200 para qualquer serviço',
                type: 'gift_card',
                price: 200.00,
                validityDays: 365
            }
        ]);
        console.log(`✅ ${products.length} produtos criados`);

        console.log('\n✨ Seed concluído com sucesso!');
        console.log('\n📊 Resumo:');
        console.log(`   👤 Usuários: ${await User.countDocuments()}`);
        console.log(`   💅 Serviços: ${await Service.countDocuments()}`);
        console.log(`   📦 Produtos: ${await Product.countDocuments()}`);
        console.log('\n🔐 Login de teste:');
        console.log('   Email: admin@gabriela.com');
        console.log('   Senha: gabriela2025');

        process.exit(0);

    } catch (error) {
        console.error('❌ Erro no seed:', error);
        process.exit(1);
    }
};

seedDatabase();
