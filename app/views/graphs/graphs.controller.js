(function() {
  'use strict';

  angular
    .module('app')
    .controller('graphsController', graphsController);

  function graphsController($http, $state, waterService, HomeService) {
    const vm = this;
    vm.$onInit = loadData;
    vm.data = [];
    vm.dailyData = [];
    vm.series = [];
    const {ipcRenderer} = require('electron');


    vm.printer = function() {
      console.log('clicked');
      ipcRenderer.send('printingGraphs', 'ping')
      ipcRenderer.on('wrote-pdf', function (event, path) {
        console.log(path);
        // document.getElementById('pdf-path').innerHTML = message
      });
    };


    function loadData() {
      waterService.getAllSystems()
        .then(response => {
          return response;
        })
        .then(systems => {
          systems.forEach(system => {
            waterService.getWaterMonthly(system)
              .then(response => {
                response = response.sort(function(a, b) {
                  a = new Date(a.Month);
                  b = new Date(b.Month);
                  return a<b ? -1 : a>b ? 1 : 0;
                });
                let total = response.map(month => {
                  if (typeof month.Total != 'number') {
                    month.Total = Number(month.Total.replace(',',''));
                  }
                  return {
                    x: month.Month,
                    y: month.Total
                  }

                });
                vm.data.push(total);
                vm.series.push(system);
              })
              .then(() => {
                return waterService.getWaterDaily(system)
                  .then(response => {
                    response = response.sort(function(a, b) {
                      a = new Date(a.Day);
                      b = new Date(b.Day);
                      return a<b ? -1 : a>b ? 1 : 0;
                    });
                    let total = response.map(month => {
                      if (typeof month.Total != 'number') {
                        month.Total = Number(month.Total.replace(',',''));
                      }
                      return {
                        x: month.Day,
                        y: month.Total
                      };
                    });
                    vm.dailyData.push(total);
                  });
              });
          });
        })
        .then(() => {
          vm.colors = ["#274769","#670422","#385e27","#f49542","#b541f4","#41c7f4","#aff441","#f44141","#4c4b56"];
          vm.colorsLine = [{
            backgroundColor : '#274769',
            pointBackgroundColor: '#274769',
            pointHoverBackgroundColor: '#274769',
            borderColor: '#274769',
            pointBorderColor: '#274769',
            pointHoverBorderColor: '#274769',
            fill: false
          },{
            backgroundColor:'#670422',
            pointBackgroundColor: '#670422',
            pointBorderColor: '#670422',
            pointHoverBackgroundColor: '#670422',
            borderColor: '#670422',
            pointBorderColor: '#670422',
            pointHoverBorderColor: '#670422',
            fill: false
          }, {
            backgroundColor:'#385e27',
            pointBackgroundColor: '#385e27',
            pointBorderColor: '#385e27',
            pointHoverBackgroundColor: '#385e27',
            borderColor: '#385e27',
            pointBorderColor: '#385e27',
            pointHoverBorderColor: '#385e27',
            fill: false
          }, {
            backgroundColor:'#f49542',
            pointBackgroundColor: '#f49542',
            pointBorderColor: '#f49542',
            pointHoverBackgroundColor: '#f49542',
            borderColor: '#f49542',
            pointBorderColor: '#f49542',
            pointHoverBorderColor: '#f49542',
            fill: false
          }, {
            backgroundColor:'#b541f4',
            pointBackgroundColor: '#b541f4',
            pointBorderColor: '#b541f4',
            pointHoverBackgroundColor: '#b541f4',
            borderColor: '#b541f4',
            pointBorderColor: '#b541f4',
            pointHoverBorderColor: '#b541f4',
            fill: false
          }, {
            backgroundColor:'#41c7f4',
            pointBackgroundColor: '#41c7f4',
            pointBorderColor: '#41c7f4',
            pointHoverBackgroundColor: '#41c7f4',
            borderColor: '#41c7f4',
            pointBorderColor: '#41c7f4',
            pointHoverBorderColor: '#41c7f4',
            fill: false
          }, {
            backgroundColor:'#aff441',
            pointBackgroundColor: '#aff441',
            pointBorderColor: '#aff441',
            pointHoverBackgroundColor: '#aff441',
            borderColor: '#aff441',
            pointBorderColor: '#aff441',
            pointHoverBorderColor: '#aff441',
            fill: false
          }, {
            backgroundColor:'#f44141',
            pointBackgroundColor: '#f44141',
            pointBorderColor: '#f44141',
            pointHoverBackgroundColor: '#f44141',
            borderColor: '#f44141',
            pointBorderColor: '#f44141',
            pointHoverBorderColor: '#f44141',
            fill: false
          }, {
            backgroundColor:'#4c4b56',
            pointBackgroundColor: '#4c4b56',
            pointBorderColor: '#4c4b56',
            pointHoverBackgroundColor: '#4c4b56',
            borderColor: '#4c4b56',
            pointBorderColor: '#4c4b56',
            pointHoverBorderColor: '#4c4b56',
            fill: false
          }];
          vm.optionsDaily = {
            scales: {
              xAxes: [{
                type: 'time',
                position: 'bottom'
              }],
              yAxes: [
                {
                  display: true,
                  position: 'left',
                  ticks : {
                    callback: function(value) {
                      return waterService.numberWithCommas(value);
                    }
                  }
                }]
            },
            title: {
              display: true,
              text: "Daily Water Forecast",
              fontSize: 30
            },
            legend: {
              display: true,
              cursor: "pointer",
              labels: {
                fontSize: 20
              }
            },
            tooltips: {
              mode: 'single',
              shared: true,
              callbacks: {
                label: function (tooltipItems, data) {
                  return data.datasets[tooltipItems.datasetIndex].label + ': ' + tooltipItems.yLabel.toLocaleString();
                }
              }
            },
            elements: {
              point: {
                hoverRadius: 3
              }
            }
          };
          vm.optionsDailyStacked = {
            scales: {
              xAxes: [{
                type: 'time',
                position: 'bottom'
              }],
              yAxes: [
                {
                  stacked: true,
                  display: true,
                  position: 'left',
                  ticks : {
                    callback: function(value) {
                      return waterService.numberWithCommas(value);
                    }
                  }
                }
              ]
            },
            title: {
              display: true,
              text: "Daily Water Forecast",
              fontSize: 30
            },
            legend: {
              display: true,
              cursor: "pointer",
              labels: {
                fontSize: 20
              }
            },
            tooltips: {
              mode: 'single',
              shared: true,
              callbacks: {
                label: function (tooltipItems, data) {
                  return data.datasets[tooltipItems.datasetIndex].label + ': ' + tooltipItems.yLabel.toLocaleString();
                }
              }
            },
            elements: {
              point: {
                hoverRadius: 3
              }
            }
          };
          vm.options = {
            scales: {
              xAxes: [{
                type: 'time',
                position: 'bottom'
              }],
              yAxes: [
                {
                  stacked: true,
                  display: true,
                  position: 'left',
                  ticks : {
                    callback: function(value) {
                      return waterService.numberWithCommas(value);
                    }
                  }
                }
              ]
            },
            title: {
              display: true,
              text: "Monthly Water Forecast Totals",
              fontSize: 30
            },
            legend: {
              display: true,
              cursor: "pointer",
              labels: {
                fontSize: 20
              }
            },
            tooltips: {
              mode: 'x',
              callbacks: {
                label: function (tooltipItems, data) {
                  return data.datasets[tooltipItems.datasetIndex].label + ': ' + tooltipItems.yLabel.toLocaleString();
                }
              }
            },
            elements: {
              point: {
                hoverRadius: 3
              }
            }
          };
          vm.optionsLine = {
            scales: {
              xAxes: [{
                type: 'time',
                position: 'bottom'
              }],
              yAxes: [
                {
                  display: true,
                  position: 'left',
                  ticks : {
                    callback: function(value) {
                      return waterService.numberWithCommas(value);
                    }
                  }
                }
              ]
            },
            title: {
              display: true,
              text: "Monthly Water Forecast Totals",
              fontSize: 30
            },
            legend: {
              display: true,
              cursor: "pointer",
              labels: {
                fontSize: 20
              }
            },
            tooltips: {
              mode: 'x',
              callbacks: {
                label: function (tooltipItems, data) {
                  return data.datasets[tooltipItems.datasetIndex].label + ': ' + tooltipItems.yLabel.toLocaleString();
                }
              }
            },
            elements: {
              point: {
                hoverRadius: 3
              }
            }
          };
        });
    }

  }
}());
