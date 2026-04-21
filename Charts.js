Chart.register(ChartDataLabels);
Chart.defaults.set('plugins.datalabels', {display: false});
const ctx1 = document.getElementById('barchart').getContext('2d');
const myBarChart = new Chart(ctx1,{
    type:'bar',
    data:{
        labels: ['High priority','Medium priority','Low priority'],
        datasets:[{
            label: 'Issue priority',
            data:
            [
                high,
                med,
                low
            ],
            backgroundColor:
            [
                '#ff2226be',
                '#ffff00be',
                '#001effbe'
            ],
            borderColor:
            [
                '#ff2226',
                '#fdff00',
                '#001eff'
            ],
            borderWidth: 1,
            barPercentage: 0.3,
            categoryPercentage: 0.9,
            
        }]
    },
    options:{ indexAxis: 'y',plugins:{legend:{display: false},datalabels: { display: true,color:'#ffffff',anchor: 'end', align: 'right',offset: 5,font:{weight:'bold'}}},scales:{x:{display: false, grid:{display: false}, beginAtZero: true, suggestedMax: 50},y:{ grid:{display:false,drawBorder:false},ticks:{color:'#ffffff'}}}}
});

const ctx2 = document.getElementById('pie').getContext('2d');
const myPieChart = new Chart(ctx2,{
    type:'doughnut',
    data:{
        labels: ['Open','Overdue','Resolved'],
        datasets:[{
            label: 'Ticket Status',
            data:
            [
                openTic,
                overdueTic,
                resolvedTic
            ],
            backgroundColor:
            [
                '#00f7ff',
                '#ff0000',
                '#39ff14',
            ],
            borderColor:
            [
                '#24262dd0',
            ],
            borderWidth: 1
        }]
    },
    options:{plugins:{legend:{labels:{color:'#ffffff'}}}}
});


const ctx3 = document.getElementById('pie2').getContext('2d');
const myPendingChart = new Chart(ctx3,{
    type:'doughnut',
    data:{
        labels: ['In-progress','Not Started'],
        datasets:[{
            label: 'Pending Status',
            data:[started,notStarted],
            backgroundColor:
            [
                '#00ff00',
                '#000000'
            ],
            borderColor:
            [
                '#00ff00'
            ],
            borderWidth: 1
        }]
    },
    options:{plugins:{legend:{labels:{color:'#ffffff'}}}}
});


