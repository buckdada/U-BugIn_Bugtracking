Chart.register(ChartDataLabels);
const ctx1 = document.getElementById('barchart').getContext('2d');
const myBarChart = new Chart(ctx1,{
    type:'bar',
    data:{
        labels: ['High priority','Medium priority','Low priority'],
        datasets:[{
            label: 'Issue priority',
            data:[12,35,20],
            backgroundColor:
            [
                '#ff52527c',
                '#4489ff75',
                '#ffd64075',
            ],
            borderColor:
            [
                '#ff5252',
                '#448aff',
                '#ffd740'
            ],
            borderWidth: 1,
            barPercentage: 0.3,
            categoryPercentage: 0.9,
            
        }]
    },
    options:{ indexAxis: 'y',plugins:{legend:{display: false},datalabels: { color:'#ffffff',anchor: 'end', align: 'right',offset: 5,font:{weight:'bold'}}},scales:{x:{display: false, grid:{display: false}, max:50 ,beginAtZero: true},y:{ grid:{display:false,drawBorder:false},ticks:{color:'#9e9e9e'}}}}
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
                'cyan',
                '#ff5252',
                '#00e676',
            ],
            borderColor:
            [
                '#ffffff',
            ],
            borderWidth: 1
        }]
    }
});


const ctx3 = document.getElementById('pie2').getContext('2d');
const myPendingChart = new Chart(ctx3,{
    type:'doughnut',
    data:{
        labels: ['In-progress','Not Started'],
        datasets:[{
            label: 'Pending Status',
            data:[20,41],
            backgroundColor:
            [
                '#00e676',
                '#1a1c23'
            ],
            borderColor:
            [
                'cyan',
                '#00e676'
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