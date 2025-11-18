// Auth Management
function checkAuth() {
    const token = localStorage.getItem('token');
    const currentPage = window.location.pathname.split('/').pop();

    if (!token && currentPage !== 'login.html' && currentPage !== '') {
        window.location.href = 'login.html';
        return false;
    }

    if (token && (currentPage === 'login.html' || currentPage === '')) {
        window.location.href = 'dashboard.html';
        return false;
    }

    return true;
}

function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        api.clearToken();
        window.location.href = 'login.html';
    }
}

// Login Form Handler
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');
        const submitButton = e.target.querySelector('button[type="submit"]');

        submitButton.disabled = true;
        submitButton.textContent = 'Entrando...';
        errorMessage.style.display = 'none';

        try {
            const response = await api.login(email, password);

            if (response.token) {
                api.setToken(response.token);

                // Save user info
                if (response.user) {
                    localStorage.setItem('user', JSON.stringify(response.user));
                }

                window.location.href = 'dashboard.html';
            } else {
                throw new Error('Token não recebido');
            }
        } catch (error) {
            errorMessage.textContent = error.message || 'Email ou senha incorretos';
            errorMessage.style.display = 'block';
            submitButton.disabled = false;
            submitButton.textContent = 'Entrar';
        }
    });
}

// Load user info on protected pages
if (window.location.pathname.includes('dashboard') ||
    window.location.pathname.includes('agenda') ||
    window.location.pathname.includes('clientes') ||
    window.location.pathname.includes('financeiro') ||
    window.location.pathname.includes('marketing') ||
    window.location.pathname.includes('documentos')) {

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (document.getElementById('userName') && user.name) {
        document.getElementById('userName').textContent = user.name;
    }

    if (document.querySelector('.user-avatar') && user.name) {
        document.querySelector('.user-avatar').textContent = user.name.charAt(0).toUpperCase();
    }
}

// Check auth on page load
checkAuth();
