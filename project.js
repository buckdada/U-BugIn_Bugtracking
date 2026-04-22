// project.js - Handles projects display with persistence and CRUD in #Projects section

// Load projects from localStorage, default sample data
projects = JSON.parse(localStorage.getItem('projects')) || [
    { id: 1, name: 'Project Alpha' },
    { id: 2, name: 'U-BugIn Bugtracker' },
    { id: 3, name: 'Web Dashboard' },
    { id: 4, name: 'Issue Management System' },
    { id: 5, name: 'Team Collaboration Tool' }
];

// Save to localStorage
function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Get next available ID
function getNextId() {
    return projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
}

// Add new project
function addProject(name) {
    if (!name || name.trim().length < 2) return false;
    const newProject = { id: getNextId(), name: name.trim() };
    projects.push(newProject);
    saveProjects();
    renderProjects();
    return true;
}

// Delete project by ID
function deleteProject(id) {
    if (confirm(`Delete project ID ${id}?`)) {
        projects = projects.filter(p => p.id !== id);
        saveProjects();
        renderProjects();
    }
}

function renderProjects() {
    const container = document.getElementById('projects-list');
    if (!container) return;

    // Add form
    const formHtml = `
        <form class="add-form">
            <input type="text" id="project-name-input" placeholder="Enter project name" maxlength="100" required>
            <button type="submit">Add Project</button>
        </form>
    `;
    container.innerHTML = formHtml;

    const form = container.querySelector('.add-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('project-name-input');
        if (addProject(input.value)) {
            input.value = '';
        }
    });

    if (projects.length === 0) {
        container.innerHTML += '<div class="no-projects">No projects. Add one above!</div>';
        return;
    }

    // Render cards
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-id">ID: ${project.id}</div>
            <h3 class="project-name">${project.name}</h3>
            <button class="delete-btn" data-id="${project.id}">Delete</button>
        `;
        card.querySelector('.delete-btn').addEventListener('click', () => deleteProject(project.id));
        // Card click for select (non-delete)
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('delete-btn')) {
                alert(`Selected Project ID: ${project.id}, Name: ${project.name}`);
            }
        });
        container.appendChild(card);
    });
}