(function() {
  'use strict';

  angular
    .module('app')
    .controller('productionController', productionController);

  function productionController($http, ProductionService, $state, waterService) {
    const vm = this;
    // const {ipcRenderer} = require('electron');
    vm.$onInit = loadData;
    vm.type = $state.params.type;
    vm.monthlyData;
    vm.dailyData;
    vm.monthlyBo = [];
    vm.dailyBo = [];
    vm.monthlyBoe = [];
    vm.dailyBoe = [];
    vm.series = ['PDP_Oil', 'New_Wells_Oil', 'Total_Oil'];
    vm.seriesBOE = ['PDP_BOE', 'New_Wells_BOE', 'Total_BOE'];
    vm.btnText = true;
    vm.daily = false;
    vm.displayed = 50;
    vm.loadMore = loadMore;

    function loadData() {
      ProductionService.getMonthly($state.params.type.toLowerCase())
        .then(data => {
          vm.monthlyData = data;
          console.log(vm.monthlyData);
          let pdpBo = data.map(month => {
            if (typeof month.PDP_Oil != 'number') {
              month.PDP_Oil = Number(month.PDP_Oil.replace(',',''));
            }
            return {
              x: month.Month,
              y: month.PDP_Oil
            };
          });
          let newBo = data.map(month => {
            if (typeof month.New_Wells_Oil != 'number') {
              month.New_Wells_Oil = Number(month.New_Wells_Oil.replace(',',''));
            }
            return {
              x: month.Month,
              y: month.New_Wells_Oil
            };
          });
          let totalBo = data.map(month => {
            if (typeof month.Total_Oil != 'number') {
              month.Total_Oil = Number(month.Total_Oil.replace(',',''));
            }
            return {
              x: month.Month,
              y: month.Total_Oil
            };
          });
          let pdpBoe = data.map(month => {
            if (typeof month.PDP_BOE != 'number') {
              month.PDP_BOE = Number(month.PDP_BOE.replace(',',''));
            }
            return {
              x: month.Month,
              y: month.PDP_BOE
            };
          });
          let newBoe = data.map(month => {
            if (typeof month.New_Wells_BOE != 'number') {
              month.New_Wells_BOE = Number(month.New_Wells_BOE.replace(',',''));
            }
            return {
              x: month.Month,
              y: month.New_Wells_BOE
            };
          });
          let totalBoe = data.map(month => {
            if (typeof month.Total_BOE != 'number') {
              month.Total_BOE = Number(month.Total_BOE.replace(',',''));
            }
            return {
              x: month.Month,
              y: month.Total_BOE
            };
          });
          vm.monthlyBo.push(pdpBo);
          vm.monthlyBo.push(newBo);
          vm.monthlyBo.push(totalBo);
          vm.monthlyBoe.push(pdpBoe);
          vm.monthlyBoe.push(newBoe);
          vm.monthlyBoe.push(totalBoe);
        })
        .then(() => {
          ProductionService.getDaily($state.params.type.toLowerCase())
          .then(data => {
            vm.dailyData = data;

            let pdpBo = data.map(Day => {
              if (typeof Day.PDP_Oil != 'number') {
                Day.PDP_Oil = Number(Day.PDP_Oil.replace(',',''));
              }
              return {
                x: Day.Day,
                y: Day.PDP_Oil
              };
            });
            let newBo = data.map(Day => {
              if (typeof Day.New_Wells_Oil != 'number') {
                Day.New_Wells_Oil = Number(Day.New_Wells_Oil.replace(',',''));
              }
              return {
                x: Day.Day,
                y: Day.New_Wells_Oil
              };
            });
            let totalBo = data.map(Day => {
              if (typeof Day.Total_Oil != 'number') {
                Day.Total_Oil = Number(Day.Total_Oil.replace(',',''));
              }
              return {
                x: Day.Day,
                y: Day.Total_Oil
              };
            });
            let pdpBoe = data.map(Day => {
              if (typeof Day.PDP_BOE != 'number') {
                Day.PDP_BOE = Number(Day.PDP_BOE.replace(',',''));
              }
              return {
                x: Day.Day,
                y: Day.PDP_BOE
              };
            });
            let newBoe = data.map(Day => {
              if (typeof Day.New_Wells_BOE != 'number') {
                Day.New_Wells_BOE = Number(Day.New_Wells_BOE.replace(',',''));
              }
              return {
                x: Day.Day,
                y: Day.New_Wells_BOE
              };
            });
            let totalBoe = data.map(Day => {
              if (typeof Day.Total_BOE != 'number') {
                Day.Total_BOE = Number(Day.Total_BOE.replace(',',''));
              }
              return {
                x: Day.Day,
                y: Day.Total_BOE
              };
            });
            vm.dailyBo.push(pdpBo);
            vm.dailyBo.push(newBo);
            vm.dailyBo.push(totalBo);
            vm.dailyBoe.push(pdpBoe);
            vm.dailyBoe.push(newBoe);
            vm.dailyBoe.push(totalBoe);
          });
        });

      vm.colors = [{
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
      vm.options = {
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
    }

    function loadMore() {
      vm.displayed += 20;
    };

  };
}());
