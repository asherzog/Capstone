(function() {
  'use strict';

  angular
    .module('app')
    .controller('monthlyGraphController', monthlyGraphController);

  function monthlyGraphController($http, $state, waterService, HomeService) {
    const vm = this;
    let system = $state.params.water;
    vm.system = system;
    vm.$onInit = loadData;
    vm.monthly;

    function loadData() {
      waterService.getWaterMonthly(system)
        .then(response => {
          vm.labels = response.map(month => {
            return month.Month;
          });
          let wells = response.map(month => {
            if (month.New_Wells != 0) {
              month.New_Wells = Number(month.New_Wells.replace(',',''));
            }
            return month.New_Wells;
          });
          let pdp = response.map(month => {
            return Number(month.PDP.replace(',',''));
          });
          let total = response.map(month => {
            if (typeof month.Total != 'number') {
              month.Total = Number(month.Total.replace(',',''));
            }
            return month.Total;
          });
          vm.data = [pdp, wells, total];
          return vm.data;
        })
        .then(() => {
          vm.series = ['PDP', 'New Wells', 'Total'];
          vm.colors = [{
            backgroundColor : '#0062ff',
            pointBackgroundColor: '#0062ff',
            pointHoverBackgroundColor: '#0062ff',
            borderColor: '#0062ff',
            pointBorderColor: '#0062ff',
            pointHoverBorderColor: '#0062ff',
            fill: false
          },{
            backgroundColor:'#009900',
            pointBackgroundColor: '#009900',
            pointBorderColor: '#009900',
            pointHoverBackgroundColor: '#009900',
            borderColor: '#009900',
            pointBorderColor: '#009900',
            pointHoverBorderColor: '#009900',
            fill: false
          }, {
            backgroundColor:'#670422',
            pointBackgroundColor: '#670422',
            pointBorderColor: '#670422',
            pointHoverBackgroundColor: '#670422',
            borderColor: '#670422',
            pointBorderColor: '#670422',
            pointHoverBorderColor: '#670422',
            fill: false
          }];
          vm.options = {
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
              text: "Monthly Water Forecast",
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
        })
        .then(() => {
          waterService.getWaterDaily(system)
            .then(response => {
              response = response.sort(function(a, b) {
                a = new Date(a.Day);
                b = new Date(b.Day);
                return a<b ? -1 : a>b ? 1 : 0;
              });
              vm.labelsDaily = response.map(month => {
                return month.Day;
              });
              let wells = response.map(month => {
                if (month.New_Wells != 0) {
                  month.New_Wells = Number(month.New_Wells.replace(',',''));
                }
                return month.New_Wells;
              });
              let pdp = response.map(month => {
                return Number(month.PDP.replace(',',''));
              });
              let total = response.map(month => {
                if (typeof month.Total != 'number') {
                  month.Total = Number(month.Total.replace(',',''));
                }
                return month.Total;
              });
              document.getElementById('loading').remove("loader");
              vm.dataDaily = [pdp, wells, total];
              return vm.dataDaily;
            });
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
        });
    }
  }
}());
