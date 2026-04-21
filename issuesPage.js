// STATIC DATA
/*
let people = ["John Doe", "Sarah Smith", "Mike Brown"];
let projects = ["Website", "Mobile App", "Database"];
*/
// GET ELEMENTS (FIX)
let summary, description, t_status, priority, assigned, project, dateCreated, targetDate, resolutionDate;
let resolutionSummary, issueId, formContainer, issueForm, issueTable, search, filterStatus, modalContent;

function initIssuesPage()
{
    formContainer = document.getElementById("formContainer");
    issueForm = document.getElementById("issueForm");
    issueTable = document.getElementById("issueTable");

    summary = document.getElementById("summary");
    description = document.getElementById("description");
    t_status = document.getElementById("status");
    priority = document.getElementById("priority");
    assigned = document.getElementById("assigned");
    project = document.getElementById("project");
    dateCreated = document.getElementById("dateCreated");
    targetDate = document.getElementById("targetDate");
    resolutionDate = document.getElementById("resolutionDate");
    resolutionSummary = document.getElementById("resolutionSummary");
    issueId = document.getElementById("issueId");

    search = document.getElementById("search");
    filterStatus = document.getElementById("filterStatus");
    modalContent = document.getElementById("modalContent");

    // INIT
    loadDropdowns();
    displayIssues();
}
 

// LOAD DROPDOWNS
function loadDropdowns() {
    project.innerHTML = projects.map(p => `<option>${p}</option>`).join("");
    assigned.innerHTML = people.map(p => `<option>${p}</option>`).join("");
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
        status: t_status.value,
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
    t_status.value = issue.status;
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