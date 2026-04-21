// Load users
let users = JSON.parse(localStorage.getItem('ubugin-users')) || [];

function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString();
}

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const errorEl = document.getElementById('signupError');
    
    // Validation
    if (password !== confirmPassword) {
        errorEl.textContent = 'Passwords do not match.';
        errorEl.classList.remove('d-none');
        return;
    }
    
    if (password.length < 6) {
        errorEl.textContent = 'Password must be at least 6 characters.';
        errorEl.classList.remove('d-none');
        return;
    }
    
    if (users.find(u => u.username === username || u.email === email)) {
        errorEl.textContent = 'Username or email already exists.';
        errorEl.classList.remove('d-none');
        return;
    }
    
    // Create user
    const newUser = {
        id: Date.now(),
        name,
        email,
        username,
        passwordHash: simpleHash(password)
    };
    
    users.push(newUser);
    localStorage.setItem('ubugin-users', JSON.stringify(users));
    
    // Auto-login
    localStorage.setItem('ubugin-currentUser', JSON.stringify(newUser));
    window.location.href = 'Home.html';
});
