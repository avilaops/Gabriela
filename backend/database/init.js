import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, 'gabriela.db');
const db = new sqlite3.Database(dbPath);

// Criar tabelas
db.serialize(() => {
    // Tabela de usuários (profissionais)
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            phone TEXT,
            role TEXT DEFAULT 'professional',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Tabela de clientes
    db.run(`
        CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT,
            phone TEXT NOT NULL,
            birth_date TEXT,
            photo_url TEXT,
            skin_type TEXT,
            allergies TEXT,
            notes TEXT,
            is_vip INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Tabela de serviços
    db.run(`
        CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            duration INTEGER NOT NULL,
            price REAL NOT NULL,
            is_active INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Tabela de agendamentos
    db.run(`
        CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_id INTEGER NOT NULL,
            service_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            appointment_date TEXT NOT NULL,
            appointment_time TEXT NOT NULL,
            status TEXT DEFAULT 'scheduled',
            payment_status TEXT DEFAULT 'pending',
            payment_method TEXT,
            total_amount REAL NOT NULL,
            notes TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (client_id) REFERENCES clients (id),
            FOREIGN KEY (service_id) REFERENCES services (id),
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    `);

    // Tabela de histórico de atendimentos
    db.run(`
        CREATE TABLE IF NOT EXISTS appointment_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            appointment_id INTEGER NOT NULL,
            client_id INTEGER NOT NULL,
            service_id INTEGER NOT NULL,
            before_photo TEXT,
            after_photo TEXT,
            products_used TEXT,
            observations TEXT,
            satisfaction_rating INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (appointment_id) REFERENCES appointments (id),
            FOREIGN KEY (client_id) REFERENCES clients (id),
            FOREIGN KEY (service_id) REFERENCES services (id)
        )
    `);

    // Tabela de produtos/pacotes
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            sessions INTEGER,
            validity_days INTEGER,
            is_active INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Tabela de vendas de produtos
    db.run(`
        CREATE TABLE IF NOT EXISTS product_sales (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            client_id INTEGER,
            buyer_name TEXT,
            buyer_email TEXT,
            buyer_phone TEXT,
            quantity INTEGER DEFAULT 1,
            unit_price REAL NOT NULL,
            total_amount REAL NOT NULL,
            payment_method TEXT,
            payment_status TEXT DEFAULT 'pending',
            purchase_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            expiry_date TEXT,
            used_sessions INTEGER DEFAULT 0,
            FOREIGN KEY (product_id) REFERENCES products (id),
            FOREIGN KEY (client_id) REFERENCES clients (id)
        )
    `);

    // Tabela de anamnese
    db.run(`
        CREATE TABLE IF NOT EXISTS anamnesis (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_id INTEGER NOT NULL,
            has_allergy INTEGER DEFAULT 0,
            allergy_details TEXT,
            has_skin_condition INTEGER DEFAULT 0,
            skin_condition_details TEXT,
            is_pregnant INTEGER DEFAULT 0,
            uses_medication INTEGER DEFAULT 0,
            medication_details TEXT,
            previous_procedures TEXT,
            expectations TEXT,
            consent_signed INTEGER DEFAULT 0,
            consent_date DATETIME,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (client_id) REFERENCES clients (id)
        )
    `);

    // Tabela de lembretes/marketing
    db.run(`
        CREATE TABLE IF NOT EXISTS reminders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_id INTEGER NOT NULL,
            type TEXT NOT NULL,
            message TEXT NOT NULL,
            scheduled_date TEXT NOT NULL,
            sent INTEGER DEFAULT 0,
            sent_at DATETIME,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (client_id) REFERENCES clients (id)
        )
    `);

    // Tabela de tags/categorias de clientes
    db.run(`
        CREATE TABLE IF NOT EXISTS client_tags (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_id INTEGER NOT NULL,
            tag TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (client_id) REFERENCES clients (id)
        )
    `);

    console.log('✅ Tabelas criadas com sucesso!');

    // Inserir dados iniciais
    // Serviços padrão
    const services = [
        ['Design de Sobrancelhas', 'Design personalizado com pinça', 30, 50.00],
        ['Brow Lamination', 'Laminação de sobrancelhas para efeito volumoso', 60, 150.00],
        ['Nanofios', 'Técnica de fios realistas', 90, 300.00],
        ['Linha Egípcia', 'Remoção com linha', 20, 40.00],
        ['Brow Lamination + Design', 'Combo completo', 75, 180.00],
        ['Manutenção de Sobrancelhas', 'Retoque e manutenção', 30, 60.00]
    ];

    db.get('SELECT COUNT(*) as count FROM services', (err, row) => {
        if (!err && row.count === 0) {
            const stmt = db.prepare('INSERT INTO services (name, description, duration, price) VALUES (?, ?, ?, ?)');
            services.forEach(service => {
                stmt.run(service);
            });
            stmt.finalize();
            console.log('✅ Serviços padrão inseridos!');
        }
    });

    // Produtos padrão
    const products = [
        ['Pacote 3 Manutenções', 'package', '3 sessões de manutenção com desconto', 150.00, 3, 90],
        ['Vale-Presente R$ 100', 'gift_card', 'Vale-presente para qualquer serviço', 100.00, null, 180],
        ['Vale-Presente R$ 200', 'gift_card', 'Vale-presente para qualquer serviço', 200.00, null, 180],
        ['Guia de Cuidados Pós-Procedimento', 'digital_product', 'E-book completo com cuidados', 29.90, null, null]
    ];

    db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
        if (!err && row.count === 0) {
            const stmt = db.prepare('INSERT INTO products (name, type, description, price, sessions, validity_days) VALUES (?, ?, ?, ?, ?, ?)');
            products.forEach(product => {
                stmt.run(product);
            });
            stmt.finalize();
            console.log('✅ Produtos padrão inseridos!');
        }
    });

    console.log('🎉 Banco de dados inicializado com sucesso!');
});

db.close((err) => {
    if (err) {
        console.error('Erro ao fechar o banco:', err.message);
    }
});
