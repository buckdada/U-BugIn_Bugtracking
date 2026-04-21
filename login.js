// Load users from localStorage, default empty
let users = JSON.parse(localStorage.getItem('ubugin-users')) || [];

// Simple hash (client-side demo only, not secure)
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    const user = users.find(u => 
        (u.username === username || u.email === username) && 
        u.passwordHash === simpleHash(password)
    );
    
    const errorEl = document.getElementById('loginError');
    
    if (user) {
        localStorage.setItem('ubugin-currentUser', JSON.stringify(user));
        window.location.href = 'Home.html';
    } else {
        errorEl.textContent = 'Invalid username/email or password.';
        errorEl.classList.remove('d-none');
    }
});
