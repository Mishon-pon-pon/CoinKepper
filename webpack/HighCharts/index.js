export function renderHigChart(data) {
    let chartData = [];
    for(let i = 0; i < data.length; i++) {
        chartData.push({name: data[i].Name, y: data[i].Value})
    }
    return Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Ваши траты в процентах к общей сумме'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Вы потратили',
            colorByPoint: true,
            data: chartData
        }]
    });
}
