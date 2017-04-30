(function() {
  'use strict';

  angular
    .module('app')
    .controller('graphsController', graphsController);

  function graphsController($http, $state, waterService, HomeService, $scope) {
    const vm = this;
    vm.$onInit = loadData;
    vm.data = [];
    vm.dailyData = [];
    vm.series = [];
    vm.printing = false;
    vm.printingMargins = '';
    const {ipcRenderer} = require('electron');


    vm.printer = function() {
      vm.printing = true;
      vm.printingMargins = 'pMargins'
      HomeService.printing = 'printing';
      ipcRenderer.send('printingGraphs', 'ping');
      ipcRenderer.on('wrote-pdf', function (event, path) {
        vm.printing = false;
        vm.printingMargins = '';
        HomeService.printing = '';
        $scope.$apply();
      });
    };


    function loadData() {
      var myConfig = {
        "background-color":"white",
        "type":"line",
        "title":{
          "text":"Monthly Water Forecast",
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
          "labels": [],
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
          }
        },
        "crosshair-x":{
          "plot-label":{
            "multiple":true
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
        "series":[]
      };
      var myConfigDaily = {
        "background-color":"white",
        "type":"line",
        "title":{
          "text":"Daily Water Forecast",
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
          "labels": [],
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
          }
        },
        "crosshair-x":{
          "plot-label":{
            "multiple":true
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
        "series":[]
      };
      var myConfigStacked = {
        "background-color":"white",
        "type":"area",
        "title":{
          "text":"Monthly Stacked Water Forecast",
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
          "labels": [],
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
          }
        },
        "crosshair-x":{
          "plot-label":{
            "multiple":true
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
        "series":[]
      };
      var myConfigDailyStacked = {
        "background-color":"white",
        "type":"area",
        "title":{
          "text":"Daily Stacked Water Forecast",
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
          "labels": [],
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
          }
        },
        "crosshair-x":{
          "plot-label":{
            "multiple":true
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
        "series":[]
      };
      waterService.getAllSystems()
        .then(response => {
          return response;
        })
        .then(systems => {
          var i = 0;
          var i2 = 0;
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
                  return [month.Month, month.Total];
                });
                let colors = ["#ff6666","#00abb0","#6e9cdb","#28ffef","#f2b012","#811eae"];
                myConfig["series"].push({
                  "aspect": "spline",
                  "values": total,
                  "text": system,
                  "line-color":colors[i],
                  "marker":{
                    "background-color":colors[i],
                    "border-color":colors[i]
                  }
                });
                myConfigStacked["series"].push({
                  "aspect": "spline",
                  "stacked": true,
                  "values": total,
                  "text": system,
                  "line-color":colors[i],
                  "background-color": colors[i],
                  "marker":{
                    "background-color":colors[i],
                    "border-color":colors[i]
                  }
                });
                i++;
                return system;
              })
              .then(() => {
                return waterService.getWaterDaily(system)
                  .then(response => {
                    response = response.sort(function(a, b) {
                      a = new Date(a.Day);
                      b = new Date(b.Day);
                      return a<b ? -1 : a>b ? 1 : 0;
                    });
                    let totalDaily = response.map(month => {
                      if (typeof month.Total != 'number') {
                        month.Total = Number(month.Total.replace(',',''));
                      }
                      return [month.Day, month.Total];
                    });
                    let colors = ["#ff6666","#00abb0","#6e9cdb","#28ffef","#f2b012","#811eae"];
                    myConfigDaily["series"].push({
                      "aspect": "spline",
                      "values": totalDaily,
                      "text": system,
                      "line-color":colors[i2],
                      "marker":{
                        "background-color":colors[i2],
                        "border-color":colors[i2]
                      }
                    });
                    myConfigDailyStacked["series"].push({
                      "aspect": "spline",
                      "stacked": true,
                      "values": totalDaily,
                      "text": system,
                      "line-color":colors[i2],
                      "background-color": colors[i2],
                      "marker":{
                        "background-color":colors[i2],
                        "border-color":colors[i2]
                      }
                    });
                    i2++;
                    return totalDaily;
                  });
              })
              .then(() => {
                zingchart.render({
                  id : 'myChart',
                  data : myConfig,
                  height: "100%",
                  width: "100%"
                });
                zingchart.render({
                  id : 'myChart3',
                  data : myConfigStacked,
                  height: "100%",
                  width: "100%"
                });
                zingchart.render({
                  id : 'myChart2',
                  data : myConfigDaily,
                  height: "100%",
                  width: "100%"
                });
                zingchart.render({
                  id : 'myChart4',
                  data : myConfigDailyStacked,
                  height: "100%",
                  width: "100%"
                });
                document.getElementById('loading').remove("loader");
              });
          });
          return vm.data;
        });
    }

  }
}());
