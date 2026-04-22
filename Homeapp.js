let openTic = 0;
let overdueTic = 0;
let resolvedTic = 0;

let high = 0;
let med = 0;
let low = 0;

let started = 0;
let notStarted = 0;


function getstats()
{
    openTic = issues.filter(ticket => ticket.status === 'Open'|| ticket.status === 'open').length;
    overdueTic = issues.filter(ticket => ticket.status === 'Overdue'|| ticket.status === 'overdue').length;
    resolvedTic = issues.filter(ticket => ticket.status === 'Resolved'|| ticket.status === 'resolved').length;

    high = issues.filter(ticket => ticket.priority === 'high' || ticket.priority === 'High').length;
    med = issues.filter(ticket => ticket.priority === 'medium' || ticket.priority === 'Medium').length;
    low = issues.filter(ticket => ticket.priority === 'low' || ticket.priority === 'Low').length;

    let maxVal = Math.max(high, med, low); 
    let chartMax = maxVal > 0 ? Math.ceil(maxVal * 1.5) : 10;

    started = projects.length;
    notStarted = Math.max(0, openTic - started);
    
    document.querySelector('.totalTickets').innerHTML = issues.length;
    document.querySelector('.openTickets').innerHTML = openTic;
    document.querySelector('.pendingTickets').innerHTML = started;

    if (typeof myPieChart !== 'undefined') {
        myPieChart.data.datasets[0].data = [openTic, overdueTic, resolvedTic];
        myPieChart.update();
    }
    if (typeof myPendingChart !== 'undefined') {
        myPendingChart.data.datasets[0].data = [started, notStarted];
        myPendingChart.update();
    }
    if (typeof myBarChart !== 'undefined') {
        myBarChart.data.datasets[0].data = [high, med, low];
        myBarChart.options.scales.x.max = chartMax;
        myBarChart.update();
    }
}


function showView(viewId) 
{
    const allViews = document.querySelectorAll('.view');
    allViews.forEach(view => {
        view.style.display = 'none';
    });
    document.getElementById(viewId).style.display = 'block';
}

document.getElementById('btn-dashboard').addEventListener('click', () => {showView('Dashboard');getstats();});
document.getElementById('btn-issues').addEventListener('click', () => {showView('Issues'); initIssuesPage();});//Loads the issues page functions when clicked
document.getElementById('btn-people').addEventListener('click', () => {showView('People');initPeopleModule();});
document.getElementById('btn-project').addEventListener('click', () => {showView('Projects');renderProjects();});
showView('Dashboard');
getstats();
