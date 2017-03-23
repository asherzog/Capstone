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


    function loadData() {
      waterService.getAllSystems()
        .then(response => {
          return response;
        })
        .then(systems => {
          systems.forEach(system => {
            waterService.getWaterMonthly(system)
              .then(response => {
                vm.labels = response.map(month => {
                  return month.Month;
                });
                let total = response.map(month => {
                  if (typeof month.Total != 'number') {
                    month.Total = Number(month.Total.replace(',',''));
                  }
                  return month.Total;
                });
                vm.data.push(total);
              })
              .then(() => {
                return waterService.getWaterDaily(system)
                  .then(response => {
                    response = response.sort(function(a, b) {
                      a = new Date(a.Day);
                      b = new Date(b.Day);
                      return a<b ? -1 : a>b ? 1 : 0;
                    });
                    vm.labelsDaily = response.map(month => {
                      return month.Day;
                    });
                    let total = response.map(month => {
                      if (typeof month.Total != 'number') {
                        month.Total = Number(month.Total.replace(',',''));
                      }
                      return month.Total;
                    });
                    vm.dailyData.push(total);
                    console.log(vm.dailyData);
                  });
              });
            vm.series.push(system);
            console.log(vm.series);
          });
        })
        .then(() => {
          vm.colors = ["#274769","#670422","#385e27"];
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
          }];
          vm.optionsDaily = {
            scales: {
              yAxes: [
                {
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
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
            }
          };
          vm.optionsDailyStacked = {
            scales: {
              yAxes: [
                {
                  id: 'y-axis-1',
                  type: 'linear',
                  stacked: true,
                  display: true,
                  position: 'left',
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
            }
          };
          vm.options = {
            scales: {
              yAxes: [
                {
                  id: 'y-axis-1',
                  type: 'linear',
                  stacked: true,
                  display: true,
                  position: 'left',
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
            }
          };
          vm.optionsLine = {
            scales: {
              yAxes: [
                {
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
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
            }
          };
        });
    }

  }
}());