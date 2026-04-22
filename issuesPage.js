let issues = JSON.parse(localStorage.getItem("issues")) || [];

// STATIC DATA
let people = ["John Doe", "Jane Smith", "Bob Johnson"];
let projects = ["Project Alpha", " U-BugIn Bugtracker", "Web Dashboard","Issue Management System","Team Collaboration Tool"];

// GET ELEMENTS (FIX)
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
    project.innerHTML = projects.map(p => `<option>${p}</option>`).join("");
    assigned.innerHTML = people.map(p => `<option>${p}</option>`).join("");
}

// NAVIGATION
function goBack() {
    window.location.href = "home.html";
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
    if (issue.status !== "Resolved" && issue.targetDate) {
        let today = new Date().toISOString().split("T")[0];
        if (issue.targetDate < today) {
            issue.status = "Overdue";
        }
    }
}

// SAVE
issueForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let id = issueId.value;

    let issue = {
        id: id || Date.now(),
        summary: summary.value,
        description: description.value,
        status: status.value,
        priority: priority.value,
        assigned: assigned.value,
        project: project.value,
        dateCreated: dateCreated.value,
        targetDate: targetDate.value,
        resolutionDate: resolutionDate.value,
        resolutionSummary: resolutionSummary.value
    };

    checkOverdue(issue);

    if (id) {
        issues = issues.map(i => i.id == id ? issue : i);
    } else {
        issues.push(issue);
    }

    localStorage.setItem("issues", JSON.stringify(issues));

    hideForm();
    displayIssues();
});

// DISPLAY
function displayIssues() {
    let searchValue = search.value.toLowerCase();
    let filterValue = filterStatus.value;

    issueTable.innerHTML = "";

    issues.forEach(issue => {

        checkOverdue(issue);

        if (
            issue.summary.toLowerCase().includes(searchValue) &&
            (filterValue === "" || issue.status === filterValue)
        ) {
            issueTable.innerHTML += `
            <tr>
                <td>${issue.summary}</td>
                <td><span class="badge bg-info">${issue.status}</span></td>
                <td><span class="badge badge-${issue.priority.toLowerCase()}">${issue.priority}</span></td>
                <td>${issue.assigned}</td>
                <td>${issue.project}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewIssue(${issue.id})">View</button>
                    <button class="btn btn-sm btn-warning" onclick="editIssue(${issue.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteIssue(${issue.id})">Delete</button>
                </td>
            </tr>
            `;
        }
    });

    localStorage.setItem("issues", JSON.stringify(issues));
}

// VIEW
function viewIssue(id) {
    let issue = issues.find(i => i.id == id);

    modalContent.innerHTML = `
        <p><b>Summary:</b> ${issue.summary}</p>
        <p><b>Description:</b> ${issue.description}</p>
        <p><b>Project:</b> ${issue.project}</p>
        <p><b>Assigned:</b> ${issue.assigned}</p>
        <p><b>Status:</b> ${issue.status}</p>
        <p><b>Priority:</b> ${issue.priority}</p>
        <p><b>Date Created:</b> ${issue.dateCreated}</p>
        <p><b>Target Date:</b> ${issue.targetDate}</p>
        <p><b>Resolution Date:</b> ${issue.resolutionDate}</p>
        <p><b>Resolution:</b> ${issue.resolutionSummary}</p>
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
    status.value = issue.status;
    priority.value = issue.priority;
    assigned.value = issue.assigned;
    project.value = issue.project;
    dateCreated.value = issue.dateCreated;
    targetDate.value = issue.targetDate;
    resolutionDate.value = issue.resolutionDate;
    resolutionSummary.value = issue.resolutionSummary;
}

// DELETE

function deleteIssue(id) {

    let confirmDelete = confirm("Are you sure you want to delete this issue?");

    if (confirmDelete) {
        issues = issues.filter(i => i.id != id);
        localStorage.setItem("issues", JSON.stringify(issues));
        displayIssues();
    }
}
/*
function deleteIssue(id) {
    issues = issues.filter(i => i.id != id);
    localStorage.setItem("issues", JSON.stringify(issues));
    displayIssues();
}
*/
// EVENTS
search.addEventListener("input", displayIssues);
filterStatus.addEventListener("change", displayIssues);

// INIT
loadDropdowns();
displayIssues();
