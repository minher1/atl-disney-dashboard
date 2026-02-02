// Authentication check for dashboard pages
// This script should be included at the top of index.html

(function() {
    // Check if user is authenticated
    const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
    const loginTime = sessionStorage.getItem('loginTime');
    
    if (!isAuthenticated) {
        // Redirect to login page
        window.location.href = '../login.html';
        return;
    }
    
    // Check session timeout (24 hours)
    if (loginTime) {
        const elapsed = new Date().getTime() - parseInt(loginTime);
        const hours = elapsed / (1000 * 60 * 60);
        
        if (hours > 24) {
            // Session expired
            sessionStorage.clear();
            alert('Your session has expired. Please log in again.');
            window.location.href = '../login.html';
            return;
        }
    }
    
    // Add logout functionality
    window.logout = function() {
        if (confirm('Are you sure you want to log out?')) {
            sessionStorage.clear();
            window.location.href = '../login.html';
        }
    };
    
    // Add logout button to page (if not already present)
    window.addEventListener('DOMContentLoaded', function() {
        if (!document.getElementById('logoutButton')) {
            const logoutBtn = document.createElement('button');
            logoutBtn.id = 'logoutButton';
            logoutBtn.innerHTML = '🔒 Logout';
            logoutBtn.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 10px 20px;
                background: #da1e28;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
                z-index: 9999;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                transition: all 0.2s;
            `;
            logoutBtn.onmouseover = function() {
                this.style.background = '#a2191f';
                this.style.transform = 'translateY(-2px)';
            };
            logoutBtn.onmouseout = function() {
                this.style.background = '#da1e28';
                this.style.transform = 'translateY(0)';
            };
            logoutBtn.onclick = window.logout;
            document.body.appendChild(logoutBtn);
        }
    });
})();

// Made with Bob
