// auth.js - Authentication utilities for Home.html
// Load current user
let currentUser = JSON.parse(localStorage.getItem('ubugin-currentUser')) || null;

// Simple hash (matches login/signup)
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString();
}

// Logout
function logout() {
    localStorage.removeItem('ubugin-currentUser');
    window.location.href = 'login.html';
}

// Update profile divs
function updateProfiles() {
    const profileDivs = document.querySelectorAll('.profile');
    profileDivs.forEach(div => {
        if (currentUser) {
    div.innerHTML = `
                <img src="profile.jpeg" alt="${currentUser.name}" class="profile-img" onerror="this.src='https://via.placeholder.com/40?text=U'">
                <span>${currentUser.username}</span>
                <a href="#" onclick="logout()" class="logout-link">Logout</a>
            `;
        } else {
            div.innerHTML = '<a href="login.html">Login</a> | <a href="signup.html">Sign Up</a>';
        }
    });
}

// Protect views - redirect if not logged in
function requireAuth() {
    if (!currentUser) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Init on load
document.addEventListener('DOMContentLoaded', function() {
    updateProfiles();
    // Override showView to require auth
    const originalShowView = window.showView;
    window.showView = function(viewId) {
        if (requireAuth()) {
            originalShowView(viewId);
        }
    };
});
