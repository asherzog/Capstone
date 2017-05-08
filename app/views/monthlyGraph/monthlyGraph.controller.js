(function() {
  'use strict';

  angular
    .module('app')
    .controller('monthlyGraphController', monthlyGraphController);

  function monthlyGraphController($http, $state, waterService, HomeService, $scope) {
    const vm = this;
    let system = $state.params.water;
    vm.system = system;
    vm.$onInit = loadData;
    vm.monthly;
    vm.printing = false;
    vm.myJson = {};
    const {ipcRenderer} = require('electron');


    vm.printer = function() {
      vm.printing = true;
      HomeService.printing = 'printing';
      ipcRenderer.send('printingHome', 'ping')
      ipcRenderer.on('wrote-pdf', function (event, path) {
        vm.printing = false;
        HomeService.printing = '';
        $scope.$apply();
        // document.getElementById('pdf-path').innerHTML = message
      });
    };

    function loadData() {
      waterService.getWaterMonthly(system)
        .then(response => {
          response = response.sort(function(a, b) {
            a = new Date(a.Month);
            b = new Date(b.Month);
            return a<b ? -1 : a>b ? 1 : 0;
          });
          vm.labels = response.map(month => {
            return month.Month;
          });
          let wells = response.map(month => {
            if (month.New_Wells != 0) {
              month.New_Wells = Number(month.New_Wells);
            }
            return month.New_Wells;
          });
          let pdp = response.map(month => {
            if (month.PDP != 0) {
              month.PDP = Number(month.PDP);
            }
            return month.PDP;
          });
          let total = response.map(month => {
            if (typeof month.Total != 'number') {
              month.Total = Number(month.Total);
            }
            return month.Total;
          });
          vm.data = [pdp, wells, total];
          var myConfig = {
            "background-color":"white",
            "type":"line",
            "plotarea": {
              marginLeft: "dynamic",
              marginRight: "dynamic"
            },
            "title":{
              "text":`${system} Monthly Water Forecast`,
              "color":"#333",
              "background-color":"white",
              "width":"100%",
              "text-align":"center",
            },
        	"legend": {
          "layout":"x1",
          "margin-top":"5%",
          "border-width":"0",
          "shadow":false,
          "marker":{
            "cursor":"hand",
            "border-width":"0"
          },
          "background-color": "white",
          "item":{
            "cursor":"hand"
          },
          "toggle-action":"remove"
        },
        	"scale-x":{
          "labels":vm.labels,
          "guide":{
            "line-color":"black",
            "line-width":1,
            "line-style":"dotted" //"solid", "dotted", "dashed", "dashdot"
          }
        	},
        	"scale-y":{
          "guide":{
            "line-color":"black",
            "line-width":1,
            "line-style":"dotted" //"solid", "dotted", "dashed", "dashdot"
          },
          "thousands-separator": ","
        	},
            "crosshair-x":{
              "plot-label":{
                "multiple":true,
                "thousands-separator": ","
              }
            },
        	"plot":{
          "tooltip": {
            "visible": false
          },
          "line-width": 2,
          "marker":{
            "size":2
          },
          "selection-mode":"multiple",
          "background-mode":"graph",
          "selected-state":{
            "line-width":4
          },
          "background-state":{
            "line-color":"#eee",
            "marker":{
              "background-color":"none"
            }
          }
        	},
        	"series":[
          {
            "values":vm.data[0],
            "text":"PDP",
            "line-color":"#ff6666",
            "marker":{
              "background-color":"#ff6666",
              "border-color":"#ff6666"
            }
          },
          {
            "values":vm.data[1],
            "text":"New Wells",
            "line-color":"#00abb0",
            "marker":{
              "background-color":"#00abb0",
              "border-color":"#00abb0"
            }
          },
          {
            "values":vm.data[2],
            "text":"Total",
            "line-color":"#6e9cdb",
            "marker":{
              "background-color":"#6e9cdb",
              "border-color":"#6e9cdb"
            }
          }]
          };
        zingchart.render({
        	id : 'myChart',
        	data : myConfig,
        	height: "100%",
        	width: "100%"
        });

          return vm.data;
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
                  month.New_Wells = Number(month.New_Wells);
                }
                return month.New_Wells;
              });
              let pdp = response.map(month => {
                if (month.PDP != 0) {
                  month.PDP = Number(month.PDP);
                }
                return month.PDP;
              });
              let total = response.map(month => {
                if (typeof month.Total != 'number') {
                  month.Total = Number(month.Total);
                }
                return month.Total;
              });
              document.getElementById('loading').remove("loader");
              vm.dataDaily = [pdp, wells, total];

              var myConfig = {
                "background-color":"white",
                "type":"line",
                "plotarea": {
                  marginLeft: "dynamic",
                  marginRight: "dynamic"
                },
                "title":{
                  "text":`${system} Daily Water Forecast`,
                  "color":"#333",
                  "background-color":"white",
                  "width":"100%",
                  "text-align":"center",
                },
            	"legend":{
              "layout":"x1",
              "margin-top":"5%",
              "border-width":"0",
              "shadow":false,
              "marker":{
                "cursor":"hand",
                "border-width":"0"
              },
              "background-color": "white",
              "item":{
                "cursor":"hand"
              },
              "toggle-action":"remove"
            },
            	"scale-x":{
              "labels":vm.labelsDaily,
              "guide":{
                "line-color":"black",
                "line-width":1,
                "line-style":"dotted" //"solid", "dotted", "dashed", "dashdot"
              }
            	},
            	"scale-y":{
              "guide":{
                "line-color":"black",
                "line-width":1,
                "line-style":"dotted" //"solid", "dotted", "dashed", "dashdot"
              },
              "thousands-separator": ","
            	},
                "crosshair-x":{
                  "plot-label":{
                    "multiple":true,
                    "thousands-separator": ","
                  }
                },
            	"plot":{
              "line-width": 2,
              "marker":{
                "size":2
              },
              "selection-mode":"multiple",
              "background-mode":"graph",
              "selected-state":{
                "line-width":4
              },
              "background-state":{
                "line-color":"#eee",
                "marker":{
                  "background-color":"none"
                }
              }
            	},
            	"series":[
              {
                "values":vm.dataDaily[0],
                "text":"PDP",
                "line-color":"#ff6666",
                "marker":{
                  "background-color":"#ff6666",
                  "border-color":"#ff6666"
                }
              },
              {
                "values":vm.dataDaily[1],
                "text":"New Wells",
                "line-color":"#00abb0",
                "marker":{
                  "background-color":"#00abb0",
                  "border-color":"#00abb0"
                }
              },
              {
                "values":vm.dataDaily[2],
                "text":"Total",
                "line-color":"#6e9cdb",
                "marker":{
                  "background-color":"#6e9cdb",
                  "border-color":"#6e9cdb"
                }
              }]
              };
            zingchart.render({
            	id : 'myChart2',
            	data : myConfig,
            	height: "100%",
            	width: "100%"
            });



              return vm.dataDaily;
            });
        });
    }
  }
}());
