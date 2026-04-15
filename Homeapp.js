const ctx1 = document.getElementById('barchart').getContext('2d');
const myBarChart = new Chart(ctx1,{
    type:'bar',
    data:{
        labels: ['high priority','medium priority','low priority'],
        datasets:[{
            label: 'Issue priority',
            data:[12,35,20],
            backgroundColor:
            [
                '#ff5252',
                '#448aff',
                '#ffd740',
            ],
            borderColor:
            [
                '#1a1c23',
            ],
            borderWidth: 1
        }]
    },
    options:{Plugins:{legend:{display: false}},scales:{y:{beginAsZero: true}}}
});

const ctx2 = document.getElementById('pie').getContext('2d');
const myPieChart = new Chart(ctx2,{
    type:'doughnut',
    data:{
        labels: ['Open','Overdue','Resolved'],
        datasets:[{
            label: 'Project Status',
            data:[15,21,44],
            backgroundColor:
            [
                '#ffea00',
                '#ff1744',
                '#00e676',
            ],
            borderColor:
            [
                '#1a1c23',
            ],
            borderWidth: 1
        }]
    }
});

function showView(viewId) 
{
    const allViews = document.querySelectorAll('.view');
    allViews.forEach(view => {
        view.style.display = 'none';
    });
    document.getElementById(viewId).style.display = 'block';
}

document.getElementById('btn-dashboard').addEventListener('click', () => showView('Dashboard'));
document.getElementById('btn-issues').addEventListener('click', () => showView('Issues'));
document.getElementById('btn-people').addEventListener('click', () => showView('People'));
document.getElementById('btn-project').addEventListener('click', () => showView('Projects'));
showView('Dashboard');