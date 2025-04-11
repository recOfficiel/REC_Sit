document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle
    const sidebar = document.getElementById('sidebar');
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    
    sidebarCollapse.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Dashboard Cards Navigation
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    const views = document.querySelectorAll('.view');
    
    dashboardCards.forEach(card => {
        card.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Hide all views
            views.forEach(view => {
                view.classList.remove('active-view');
            });
            
            // Show target view
            document.getElementById(`${target}-view`).classList.add('active-view');
            
            // Load data if needed
            if (target === 'users') {
                loadUsersData();
            }
        });
    });
    
    // Sidebar Links Navigation
    const sidebarLinks = document.querySelectorAll('.dashboard-link');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            
            // Hide all views
            views.forEach(view => {
                view.classList.remove('active-view');
            });
            
            // Show target view
            document.getElementById(`${section}-view`).classList.add('active-view');
            
            // Load data if needed
            if (section === 'users') {
                loadUsersData();
            }
        });
    });
    
    // Load Users Data
    function loadUsersData() {
        const users = [
            { id: 1, name: "Jean Dupont", email: "jean@example.com", role: "Admin", date: "2023-01-15" },
            { id: 2, name: "Marie Martin", email: "marie@example.com", role: "Editeur", date: "2023-02-20" },
            { id: 3, name: "Pierre Durand", email: "pierre@example.com", role: "Utilisateur", date: "2023-03-10" },
            { id: 4, name: "Sophie Lambert", email: "sophie@example.com", role: "Editeur", date: "2023-04-05" },
            { id: 5, name: "Thomas Moreau", email: "thomas@example.com", role: "Utilisateur", date: "2023-05-12" }
        ];
        
        const tableBody = document.getElementById('users-table-body');
        tableBody.innerHTML = '';
        
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><span class="badge ${getRoleBadgeClass(user.role)}">${user.role}</span></td>
                <td>${formatDate(user.date)}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-outline-danger"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    // Helper functions
    function getRoleBadgeClass(role) {
        switch(role.toLowerCase()) {
            case 'admin': return 'bg-danger';
            case 'editeur': return 'bg-warning text-dark';
            default: return 'bg-secondary';
        }
    }
    
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    }
    
    // Search functionality
    const searchInput = document.getElementById('search-users');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#users-table-body tr');
        
        rows.forEach(row => {
            const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const email = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || email.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
    
    // Sort functionality
    const sortOptions = document.querySelectorAll('.sort-option');
    sortOptions.forEach(option => {
        option.addEventListener('click', function() {
            const sortType = this.getAttribute('data-sort');
            // Implement sorting logic here
            console.log(`Sorting by: ${sortType}`);
        });
    });
    
    // Initialize dashboard with users view hidden
    document.getElementById('users-view').classList.remove('active-view');
    document.getElementById('sales-view').classList.remove('active-view');
    document.getElementById('products-view').classList.remove('active-view');
    document.getElementById('settings-view').classList.remove('active-view');
});