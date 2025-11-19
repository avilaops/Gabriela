// Gerenciamento de Usuários

let currentUserId = null;

// Carregar usuários ao carregar a página
async function loadUsers() {
    try {
        const users = await api.request('/auth/users');
        renderUsersTable(users);
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        showError('Erro ao carregar usuários');
    }
}

function renderUsersTable(users) {
    const tbody = document.getElementById('usersTableBody');
    
    if (!users || users.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">
                    <div class="empty-state">
                        <i class="iconoir-user"></i>
                        <p>Nenhum usuário encontrado</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>
                <div class="user-info-cell">
                    <div class="user-avatar-small">${user.name.charAt(0).toUpperCase()}</div>
                    <span>${user.name}</span>
                </div>
            </td>
            <td>${user.email}</td>
            <td>
                <span class="badge badge-${getRoleBadge(user.role)}">
                    ${getRoleLabel(user.role)}
                </span>
            </td>
            <td>
                <span class="badge badge-${user.active ? 'success' : 'error'}">
                    ${user.active ? 'Ativo' : 'Inativo'}
                </span>
            </td>
            <td>${formatDate(user.createdAt)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="editUser('${user._id}')" title="Editar">
                        <i class="iconoir-edit"></i>
                    </button>
                    <button class="btn-icon btn-danger" onclick="deleteUser('${user._id}', '${user.name}')" title="Excluir">
                        <i class="iconoir-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function getRoleLabel(role) {
    const labels = {
        'admin': 'Administrador',
        'professional': 'Profissional',
        'viewer': 'Visualizador'
    };
    return labels[role] || role;
}

function getRoleBadge(role) {
    const badges = {
        'admin': 'error',
        'professional': 'success',
        'viewer': 'warning'
    };
    return badges[role] || 'warning';
}

// Abrir modal para novo usuário
function openUserModal(userId = null) {
    const modal = document.getElementById('userModal');
    const form = document.getElementById('userForm');
    const modalTitle = document.getElementById('modalTitle');
    
    form.reset();
    document.getElementById('formError').style.display = 'none';
    
    if (userId) {
        modalTitle.textContent = 'Editar Usuário';
        loadUserData(userId);
        currentUserId = userId;
    } else {
        modalTitle.textContent = 'Novo Usuário';
        currentUserId = null;
        document.getElementById('userPassword').required = true;
    }
    
    modal.style.display = 'flex';
}

// Fechar modal
function closeUserModal() {
    const modal = document.getElementById('userModal');
    modal.style.display = 'none';
    currentUserId = null;
}

// Carregar dados do usuário para edição
async function loadUserData(userId) {
    try {
        const user = await api.request(`/auth/users/${userId}`);
        
        document.getElementById('userId').value = user._id;
        document.getElementById('userNameInput').value = user.name;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userRole').value = user.role;
        document.getElementById('userPhone').value = user.phone || '';
        
        // Senha não é obrigatória na edição
        document.getElementById('userPassword').required = false;
        document.getElementById('userPassword').placeholder = 'Deixe em branco para manter';
        
    } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        showError('Erro ao carregar dados do usuário');
        closeUserModal();
    }
}

// Editar usuário
function editUser(userId) {
    openUserModal(userId);
}

// Salvar usuário (criar ou atualizar)
document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('userNameInput').value,
        email: document.getElementById('userEmail').value,
        role: document.getElementById('userRole').value,
        phone: document.getElementById('userPhone').value
    };
    
    const password = document.getElementById('userPassword').value;
    if (password) {
        formData.password = password;
    }
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const formError = document.getElementById('formError');
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="iconoir-loading"></i> Salvando...';
    formError.style.display = 'none';
    
    try {
        if (currentUserId) {
            // Atualizar
            await api.request(`/auth/users/${currentUserId}`, {
                method: 'PUT',
                body: JSON.stringify(formData)
            });
            showSuccess('Usuário atualizado com sucesso!');
        } else {
            // Criar
            await api.request('/auth/register', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            showSuccess('Usuário criado com sucesso!');
        }
        
        closeUserModal();
        loadUsers();
        
    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
        formError.textContent = error.message || 'Erro ao salvar usuário';
        formError.style.display = 'block';
        
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="iconoir-check"></i> Salvar Usuário';
    }
});

// Deletar usuário
async function deleteUser(userId, userName) {
    if (!confirm(`Tem certeza que deseja excluir o usuário "${userName}"?\n\nEsta ação não pode ser desfeita.`)) {
        return;
    }
    
    try {
        await api.request(`/auth/users/${userId}`, {
            method: 'DELETE'
        });
        
        showSuccess('Usuário excluído com sucesso!');
        loadUsers();
        
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        showError('Erro ao excluir usuário');
    }
}

// Utility functions
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);
}

function showSuccess(message) {
    // Implementar toast de sucesso
    alert(message);
}

function showError(message) {
    // Implementar toast de erro
    alert(message);
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('userModal');
    if (event.target === modal) {
        closeUserModal();
    }
}

// Carregar usuários ao iniciar
if (document.getElementById('usersTable')) {
    loadUsers();
}
