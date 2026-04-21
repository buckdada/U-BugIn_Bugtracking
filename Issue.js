let people = JSON.parse(localStorage.getItem('people')) || [];
let projects = JSON.parse(localStorage.getItem('projects')) || [];
let issues = JSON.parse(localStorage.getItem('issues')) || [];


function createPerson(name, surname, email, username) {
    const newPerson = {
        id: Date.now() + Math.random(), 
        name: name,
        surname: surname,
        email: email,
        username: username,
        profilePic: 'default-profile.png' 
    };
    people.push(newPerson);
    saveToStorage();
}

function createProject(name) {
    const newProject = {
        id: `PROJ-${Date.now()}`,
        name: name
    };
    projects.push(newProject);
    saveToStorage();
}


function saveToStorage() {
    localStorage.setItem('people', JSON.stringify(people));
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem('issues', JSON.stringify(issues));
}


function seedDatabase() {
   
    if (issues.length === 0) {
        
        if (people.length === 0) createPerson("Admin", "User", "admin@ubugin.com", "admin_main");
        if (projects.length === 0) createProject("Core System Development");

        const pId = people[0].id;
        const projId = projects[0].id;

        const sampleBugs = [
            { 
                id: 1, summary: "Login button fails on mobile", description: "The login button does not trigger any event when tapped on iOS Safari.", 
                priority: "high", status: "open", project: projId, assignedTo: pId, identifiedBy: pId,
                identifiedDate: "2026-04-01", targetDate: "2026-04-05", resolutionDate: null, resolutionSummary: "" 
            },
            { 
                id: 2, summary: "Fix CSS on Dashboard cards", description: "The cards overlap when the screen width is below 400px.", 
                priority: "low", status: "resolved", project: projId, assignedTo: pId, identifiedBy: pId,
                identifiedDate: "2026-04-02", targetDate: "2026-04-03", resolutionDate: "2026-04-03", resolutionSummary: "Added flex-wrap to container." 
            },
            { 
                id: 3, summary: "Database connection timeout", description: "Occasional 504 errors when fetching large issue lists.", 
                priority: "high", status: "overdue", project: projId, assignedTo: pId, identifiedBy: pId,
                identifiedDate: "2026-03-20", targetDate: "2026-03-25", resolutionDate: null, resolutionSummary: "" 
            },
            { 
                id: 4, summary: "Typo on landing page", description: "The word 'Management' is spelled 'Managment'.", 
                priority: "low", status: "open", project: projId, assignedTo: pId, identifiedBy: pId,
                identifiedDate: "2026-04-10", targetDate: "2026-04-20", resolutionDate: null, resolutionSummary: "" 
            },
            { 
                id: 5, summary: "Profile picture not uploading", description: "JPEG files are rejected by the validation logic.", 
                priority: "medium", status: "open", project: projId, assignedTo: pId, identifiedBy: pId,
                identifiedDate: "2026-04-12", targetDate: "2026-04-15", resolutionDate: null, resolutionSummary: "" 
            },
            { 
                id: 6, summary: "Export to CSV is slow", description: "Takes over 10 seconds to generate a CSV for 100+ items.", 
                priority: "medium", status: "resolved", project: projId, assignedTo: pId, identifiedBy: pId,
                identifiedDate: "2026-04-05", targetDate: "2026-04-08", resolutionDate: "2026-04-07", resolutionSummary: "Optimized loop structure." 
            },
            { 
                id: 7, summary: "Search bar returns wrong results", description: "Searching for 'Bug' returns 'Feature' tickets.", 
                priority: "high", status: "open", project: projId, assignedTo: pId, identifiedBy: pId,
                identifiedDate: "2026-04-15", targetDate: "2026-04-16", resolutionDate: null, resolutionSummary: "" 
            },
            { 
                id: 8, summary: "Add filter by project", description: "User needs to see issues filtered by specific projects.", 
                priority: "medium", status: "open", project: projId, assignedTo: pId, identifiedBy: pId,
                identifiedDate: "2026-04-14", targetDate: "2026-04-18", resolutionDate: null, resolutionSummary: "" 
            },
            { 
                id: 9, summary: "Logo alignment in header", description: "Logo is shifted 5px to the left in Chrome.", 
                priority: "low", status: "resolved", project: projId, assignedTo: pId, identifiedBy: pId,
                identifiedDate: "2026-04-01", targetDate: "2026-04-02", resolutionDate: "2026-04-02", resolutionSummary: "Adjusted padding-left." 
            },
            { 
                id: 10, summary: "Password reset link expires fast", description: "Token expires in 1 minute instead of 30 minutes.", 
                priority: "high", status: "overdue", project: projId, assignedTo: pId, identifiedBy: pId,
                identifiedDate: "2026-03-01", targetDate: "2026-03-02", resolutionDate: null, resolutionSummary: "" 
            },
            { 
                id: 11, summary: "Kanban board drag/drop bug", description: "Cards disappear if dropped between columns.", 
                priority: "medium", status: "open", project: projId, assignedTo: pId, identifiedBy: pId,
                identifiedDate: "2026-04-16", targetDate: "2026-04-19", resolutionDate: null, resolutionSummary: "" 
            }
        ];
        issues = sampleBugs;
        saveToStorage();
        console.log("Database seeded with 11 varied issues.");
    }
}


seedDatabase();
