const PEOPLE_STORAGE_KEY = 'bug_tracker_people';

function loadPeople() {
    const stored = localStorage.getItem(PEOPLE_STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
   
    return [
        {
            id: 'person_001',
            username: 'john.doe',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            status: 'active'
        },
        {
            id: 'person_002',
            username: 'jane.smith',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            status: 'active'
        },
        {
            id: 'person_003',
            username: 'bob.johnson',
            firstName: 'Bob',
            lastName: 'Johnson',
            email: 'bob.johnson@example.com',
            status: 'inactive'
        }
    ];
}


function savePeople(people) {
    localStorage.setItem(PEOPLE_STORAGE_KEY, JSON.stringify(people));
    renderPeopleList();
   
    if (typeof updateDashboardStats === 'function') {
        updateDashboardStats();
    }
}


function generateNewPersonId() {
    const people = loadPeople();
    let maxNum = 0;
    for (const p of people) {
        const parts = p.id.split('_');
        if (parts.length === 2) {
            const num = parseInt(parts[1], 10);
            if (!isNaN(num) && num > maxNum) {
                maxNum = num;
            }
        }
    }
    const newNum = maxNum + 1;
    return person_${String(newNum).padStart(3, '0')};
}


function renderPeopleList() {
    const container = document.getElementById('peopleList');
    if (!container) return;
    
    const people = loadPeople();
    
    if (people.length === 0) {
        container.innerHTML = '<div class="empty-state">No people added yet. Click "+ Add Person" to get started!</div>';
        return;
    }
    
    container.innerHTML = '';
    for (const person of people) {
        const personCard = document.createElement('div');
        personCard.className = 'person-card';
        personCard.innerHTML = `
            <div class="person-info">
                <div class="person-avatar">${escapeHtml(person.firstName.charAt(0))}${escapeHtml(person.lastName.charAt(0))}</div>
                <div class="person-details">
                    <h4>${escapeHtml(person.firstName)} ${escapeHtml(person.lastName)}</h4>
                    <p class="person-username">@${escapeHtml(person.username)}</p>
                    <p class="person-email">${escapeHtml(person.email)}</p>
                </div>
            </div>
            <div class="person-actions">
                <button class="edit-btn" data-id="${person.id}">✏️ Edit</button>
                <button class="delete-btn" data-id="${person.id}">🗑️ Delete</button>
            </div>
        `;
        
      
        const editBtn = personCard.querySelector('.edit-btn');
        const deleteBtn = personCard.querySelector('.delete-btn');
        
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            editPerson(person.id);
        });
        
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deletePerson(person.id);
        });
        
        container.appendChild(personCard);
    }
}


function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}


function showPersonModal() {
    const modal = document.getElementById('personModal');
    const title = document.getElementById('personModalTitle');
    const idField = document.getElementById('personId');
    const form = document.getElementById('personForm');
    
    if (!modal || !title || !idField || !form) return;
    
    title.textContent = 'Add Person';
    idField.value = '';
    form.reset();
    modal.style.display = 'flex';
}


function closePersonModal() {
    const modal = document.getElementById('personModal');
    if (modal) {
        modal.style.display = 'none';
    }
}


function editPerson(id) {
    const people = loadPeople();
    const person = people.find(p => p.id === id);
    
    if (!person) return;
    
    const modal = document.getElementById('personModal');
    const title = document.getElementById('personModalTitle');
    const idField = document.getElementById('personId');
    const firstNameField = document.getElementById('personName');
    const lastNameField = document.getElementById('personSurname');
    const emailField = document.getElementById('personEmail');
    const usernameField = document.getElementById('personUsername');
    
    if (!modal || !title || !idField || !firstNameField || !lastNameField || !emailField || !usernameField) return;
    
    title.textContent = 'Edit Person';
    idField.value = person.id;
    firstNameField.value = person.firstName;
    lastNameField.value = person.lastName;
    emailField.value = person.email;
    usernameField.value = person.username;
    modal.style.display = 'flex';
}


function deletePerson(id) {
    if (confirm('Are you sure you want to delete this person? They may be assigned to issues.')) {
        let people = loadPeople();
        people = people.filter(p => p.id !== id);
        savePeople(people);
        alert('Person deleted successfully!');
    }
}


function savePerson(event) {
    event.preventDefault();
    
    const idField = document.getElementById('personId');
    const firstNameField = document.getElementById('personName');
    const lastNameField = document.getElementById('personSurname');
    const emailField = document.getElementById('personEmail');
    const usernameField = document.getElementById('personUsername');
    
    if (!idField || !firstNameField || !lastNameField || !emailField || !usernameField) return;
    
    const id = idField.value;
    const firstName = firstNameField.value.trim();
    const lastName = lastNameField.value.trim();
    const email = emailField.value.trim();
    const username = usernameField.value.trim();
    
    if (!firstName || !lastName || !email || !username) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address');
        return;
    }
    
    const people = loadPeople();
    
    if (id) {
      
        const index = people.findIndex(p => p.id === id);
        if (index !== -1) {
            people[index] = { 
                ...people[index], 
                firstName, 
                lastName, 
                email, 
                username 
            };
            savePeople(people);
            alert('Person updated successfully!');
        }
    } else {
       
        const usernameExists = people.some(p => p.username.toLowerCase() === username.toLowerCase());
        if (usernameExists) {
            alert('Username already exists. Please choose another one.');
            return;
        }
        
        const newPerson = {
            id: generateNewPersonId(),
            username,
            firstName,
            lastName,
            email,
            status: 'active'
        };
        people.push(newPerson);
        savePeople(people);
        alert('Person added successfully!');
    }
    
    closePersonModal();
}


function initPeopleModule() {
    const personForm = document.getElementById('personForm');
    if (personForm) {
       
        personForm.removeEventListener('submit', savePerson);
        personForm.addEventListener('submit', savePerson);
    }
    
   
    const modal = document.getElementById('personModal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closePersonModal();
            }
        });
    }
    
   
    renderPeopleList();
}


window.showPersonModal = showPersonModal;
window.closePersonModal = closePersonModal;
window.editPerson = editPerson;
window.deletePerson = deletePerson;
window.savePerson = savePerson;
window.initPeopleModule = initPeopleModule;


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      
        setTimeout(initPeopleModule, 100);
    });
} else {
    setTimeout(initPeopleModule, 100);
}
