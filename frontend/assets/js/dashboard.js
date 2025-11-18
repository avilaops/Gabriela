// Dashboard Logic
async function loadDashboardData() {
    try {
        const stats = await api.getDashboardStats();
        
        // Update stats cards
        document.getElementById('todayAppointments').textContent = stats.todayAppointments || 0;
        document.getElementById('totalClients').textContent = stats.totalClients || 0;
        document.getElementById('monthRevenue').textContent = formatCurrency(stats.monthRevenue || 0);
        document.getElementById('noShowRate').textContent = `${stats.noShowRate || 0}%`;
        
        // Load upcoming appointments
        await loadUpcomingAppointments();
        
        // Load top services
        if (stats.topServices && stats.topServices.length > 0) {
            renderTopServices(stats.topServices);
        }
        
        // Load new clients
        await loadNewClients();
        
    } catch (error) {
        console.error('Error loading dashboard:', error);
        showError('Erro ao carregar dados do dashboard');
    }
}

async function loadUpcomingAppointments() {
    try {
        const today = new Date().toISOString().split('T')[0];
        const appointments = await api.getAppointments({ 
            start: today,
            status: 'agendado,confirmado'
        });
        
        const container = document.getElementById('upcomingAppointments');
        
        if (!appointments || appointments.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="iconoir-calendar"></i>
                    <p>Nenhum agendamento próximo</p>
                </div>
            `;
            return;
        }
        
        const appointmentsList = appointments.slice(0, 5).map(apt => `
            <div class="appointment-item">
                <div class="appointment-time">
                    <strong>${formatTime(apt.datetime)}</strong>
                    <span>${formatDate(apt.datetime)}</span>
                </div>
                <div class="appointment-info">
                    <p class="appointment-client">${apt.clientId?.name || 'Cliente'}</p>
                    <p class="appointment-service">${apt.serviceId?.name || 'Serviço'}</p>
                </div>
                <div class="appointment-status">
                    <span class="badge badge-${getStatusBadge(apt.status)}">${apt.status}</span>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = appointmentsList;
        
    } catch (error) {
        console.error('Error loading appointments:', error);
    }
}

async function loadNewClients() {
    try {
        const clients = await api.getClients();
        
        const container = document.getElementById('newClients');
        
        if (!clients || clients.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="iconoir-user-plus"></i>
                    <p>Nenhum cliente novo</p>
                </div>
            `;
            return;
        }
        
        // Filter clients from last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const newClients = clients.filter(client => 
            new Date(client.createdAt) >= sevenDaysAgo
        );
        
        if (newClients.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="iconoir-user-plus"></i>
                    <p>Nenhum cliente novo nos últimos 7 dias</p>
                </div>
            `;
            return;
        }
        
        const clientsList = newClients.slice(0, 5).map(client => `
            <div class="client-item">
                <div class="client-avatar">${client.name.charAt(0).toUpperCase()}</div>
                <div class="client-info">
                    <p class="client-name">${client.name}</p>
                    <p class="client-phone">${formatPhone(client.phone)}</p>
                </div>
                <div class="client-date">
                    <span>${formatDate(client.createdAt)}</span>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = clientsList;
        
    } catch (error) {
        console.error('Error loading new clients:', error);
    }
}

function renderTopServices(services) {
    const container = document.getElementById('topServices');
    
    const servicesList = services.map((service, index) => `
        <div class="service-rank">
            <span class="rank-number">${index + 1}</span>
            <div class="service-info">
                <p class="service-name">${service.name}</p>
                <div class="service-bar">
                    <div class="service-bar-fill" style="width: ${service.percentage}%"></div>
                </div>
            </div>
            <span class="service-count">${service.count} vendas</span>
        </div>
    `).join('');
    
    container.innerHTML = servicesList;
}

// Utility functions
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
}

function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function formatPhone(phone) {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
}

function getStatusBadge(status) {
    const statusMap = {
        'agendado': 'warning',
        'confirmado': 'success',
        'cancelado': 'error',
        'faltou': 'error',
        'compareceu': 'success'
    };
    return statusMap[status] || 'warning';
}

function showError(message) {
    // You can implement a toast notification here
    alert(message);
}

// Load dashboard on page load
if (document.getElementById('todayAppointments')) {
    loadDashboardData();
}
