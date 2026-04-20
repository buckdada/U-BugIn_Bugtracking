// LOAD DATA FROM localStorage
let issues = JSON.parse(localStorage.getItem('bugs')) || [];
let people = JSON.parse(localStorage.getItem('people')) || [];
let projects = JSON.parse(localStorage.getItem('projects')) || [];

// GET ELEMENTS
const formContainer = document.getElementById("formContainer");
const issueForm = document.getElementById("issueForm");
const issueTable = document.getElementById("issueTable");

const summary = document.getElementById("summary");
const description = document.getElementById("description");
const status = document.getElementById("status");
const priority = document.getElementById("priority");
const assigned = document.getElementById("assigned");
const project = document.getElementById("project");
const dateCreated = document.getElementById("dateCreated");
const targetDate = document.getElementById("targetDate");
const resolutionDate = document.getElementById("resolutionDate");
const resolutionSummary = document.getElementById("resolutionSummary");
const issueId = document.getElementById("issueId");

const search = document.getElementById("search");
const filterStatus = document.getElementById("filterStatus");
const modalContent = document.getElementById("modalContent");

// LOAD DROPDOWNS
function loadDropdowns() {
    project.innerHTML = projects.map(p => `<option value="${p.id}">${p.name}</option>`).join("");
    assigned.innerHTML = people.map(p => `<option value="${p.id}">${p.name} ${p.surname}</option>`).join("");
}

// NAVIGATION
function goBack() {
    window.location.href = "Home.html";
}

// FORM
function showForm() {
    formContainer.classList.remove("d-none");
}

function hideForm() {
    formContainer.classList.add("d-none");
    issueForm.reset();
    issueId.value = "";
}

// AUTO OVERDUE
function checkOverdue(issue) {
    if (issue.status !== "resolved" && issue.targetDate) {
        let today = new Date().toISOString().split("T")[0];
        if (issue.targetDate < today) {
            issue.status = "overdue";
        }
    }
    return issue;
}

// SAVE
issueForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let id = issueId.value;

    let issue = {
        id: id || Date.now(),
        summary: summary.value,
        description: description.value,
        status: status.value.toLowerCase(),
        priority: priority.value.toLowerCase(),
        assignedTo: assigned.value,
        project: project.value,
        identifiedBy: people[0]?.id || '',
        identifiedDate: dateCreated.value,
        targetDate: targetDate.value,
        resolutionDate: resolutionDate.value || null,
        resolutionSummary: resolutionSummary.value
    };

    issue = checkOverdue(issue);

    if (id) {
        issues = issues.map(i => i.id == id ? issue : i);
    } else {
        issues.push(issue);
    }

    localStorage.setItem('bugs', JSON.stringify(issues));
    localStorage.setItem('people', JSON.stringify(people));
    localStorage.setItem('projects', JSON.stringify(projects));

    hideForm();
    displayIssues();
});

// DISPLAY
function displayIssues() {
    let searchValue = search.value.toLowerCase();
    let filterValue = filterStatus.value.toLowerCase();

    issueTable.innerHTML = "";

    issues.forEach(issue => {
        issue = checkOverdue(issue);

        if (
            issue.summary.toLowerCase().includes(searchValue) &&
            (filterValue === "" || issue.status === filterValue)
        ) {
            const assignedPerson = people.find(p => p.id == issue.assignedTo);
            const assignedName = assignedPerson ? `${assignedPerson.name} ${assignedPerson.surname}` : 'Unassigned';
            const projectName = projects.find(p => p.id == issue.project)?.name || issue.project;
            
            issueTable.innerHTML += `
            <tr>
                <td>${issue.summary}</td>
                <td><span class="badge bg-info">${issue.status}</span></td>
                <td><span class="badge badge-${issue.priority}">${issue.priority}</span></td>
                <td>${assignedName}</td>
                <td>${projectName}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewIssue(${issue.id})">View</button>
                    <button class="btn btn-sm btn-warning" onclick="editIssue(${issue.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteIssue(${issue.id})">Delete</button>
                </td>
            </tr>
            `;
        }
    });

    localStorage.setItem('bugs', JSON.stringify(issues));
}

// VIEW
function viewIssue(id) {
    let issue = issues.find(i => i.id == id);
    const assignedPerson = people.find(p => p.id == issue.assignedTo);
    const projectName = projects.find(p => p.id == issue.project)?.name || issue.project;

    modalContent.innerHTML = `
        <p><b>Summary:</b> ${issue.summary}</p>
        <p><b>Description:</b> ${issue.description}</p>
        <p><b>Project:</b> ${projectName}</p>
        <p><b>Assigned:</b> ${assignedPerson ? assignedPerson.name + ' ' + assignedPerson.surname : 'Unassigned'}</p>
        <p><b>Status:</b> ${issue.status}</p>
        <p><b>Priority:</b> ${issue.priority}</p>
        <p><b>Date Created:</b> ${issue.identifiedDate}</p>
        <p><b>Target Date:</b> ${issue.targetDate}</p>
        <p><b>Resolution Date:</b> ${issue.resolutionDate || 'N/A'}</p>
        <p><b>Resolution:</b> ${issue.resolutionSummary || 'N/A'}</p>
    `;

    new bootstrap.Modal(document.getElementById("viewModal")).show();
}

// EDIT
function editIssue(id) {
    let issue = issues.find(i => i.id == id);

    showForm();

    issueId.value = issue.id;
    summary.value = issue.summary;
    description.value = issue.description;
    status.value = issue.status.charAt(0).toUpperCase() + issue.status.slice(1);
    priority.value = issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1);
    assigned.value = issue.assignedTo;
    project.value = issue.project;
    dateCreated.value = issue.identifiedDate;
    targetDate.value = issue.targetDate;
    resolutionDate.value = issue.resolutionDate || '';
    resolutionSummary.value = issue.resolutionSummary || '';
}

// DELETE
function deleteIssue(id) {
    let confirmDelete = confirm("Are you sure you want to delete this issue?");
    if (confirmDelete) {
        issues = issues.filter(i => i.id != id);
        localStorage.setItem('bugs', JSON.stringify(issues));
        displayIssues();
    }
}

// EVENTS
search.addEventListener("input", displayIssues);
filterStatus.addEventListener("change", displayIssues);

// INIT
loadDropdowns();
displayIssues();
