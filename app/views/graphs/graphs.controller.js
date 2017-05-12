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
    vm.length = vm.series.length;
    vm.printing = false;
    vm.loading = true;
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
      var myConfig = {
        "background-color":"white",
        "type":"line",
        "plotarea": {
          marginLeft: "dynamic",
          marginRight: "dynamic"
        },
        "title":{
          "text":"Monthly Water Forecast",
          "color":"#333",
          "background-color":"white",
          "width":"100%",
          "text-align":"center",
        },
        "legend":{
          "layout":`1x${vm.length}`,
          "align": "center",
          "margin-top":"10%",
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
        "series":[]
      };
      var myConfigDaily = {
        "background-color":"white",
        "type":"line",
        "plotarea": {
          marginLeft: "dynamic",
          marginRight: "dynamic"
        },
        "title":{
          "text":"Daily Water Forecast",
          "color":"#333",
          "background-color":"white",
          "width":"100%",
          "text-align":"center",
        },
        "legend":{
          "layout":`1x${vm.length}`,
          "align": "center",
          "margin-top":"10%",
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
        "series":[]
      };
      var myConfigStacked = {
        "background-color":"white",
        "type":"area",
        "plotarea": {
          marginLeft: "dynamic",
          marginRight: "dynamic"
        },
        "title":{
          "text":"Monthly Stacked Water Forecast",
          "color":"#333",
          "background-color":"white",
          "width":"100%",
          "text-align":"center",
        },
        "legend":{
          "layout":`1x${vm.length}`,
          "align": "center",
          "margin-top":"10%",
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
        "series":[]
      };
      var myConfigDailyStacked = {
        "background-color":"white",
        "type":"area",
        "plotarea": {
          marginLeft: "dynamic",
          marginRight: "dynamic"
        },
        "title":{
          "text":"Daily Stacked Water Forecast",
          "color":"#333",
          "background-color":"white",
          "width":"100%",
          "text-align":"center",
        },
        "legend":{
          "layout":`1x${vm.length}`,
          "align": "center",
          "margin-top":"10%",
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
        "series":[]
      };
      waterService.getAllSystems()
        .then(response => {
          return response;
        })
        .then(systems => {
          var i = 0;
          var i2 = 0;
          let mapped = systems.map(system => {
            return waterService.getWaterMonthly(system)
              .then(response => {
                response = response.sort(function(a, b) {
                  a = new Date(a.Month);
                  b = new Date(b.Month);
                  return a<b ? -1 : a>b ? 1 : 0;
                });
                let total = response.map(month => {
                  if (typeof month.Total != 'number') {
                    month.Total = Math.round(Number(month.Total.replace(',','')));
                  } else {
                    month.Total = Math.round(month.Total);
                  }
                  return [new Date(month.Month).getTime(), month.Total];
                });
                return total;
              })
              .then(total => {
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
                myConfig["scale-x"]["min-value"] = total[0][0];
                myConfig["scale-x"]["step"] = "month";
                myConfig["scale-x"]["transform"] = {
                  "type": "date",
                  "all": "%m/%d/%y"
                };
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
                myConfigStacked["scale-x"]["min-value"] = total[0][0];
                myConfigStacked["scale-x"]["step"] = "month";
                myConfigStacked["scale-x"]["transform"] = {
                  "type": "date",
                  "all": "%m/%d/%y"
                };
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
                        month.Total = Math.round(Number(month.Total.replace(',','')));
                      } else {
                        month.Total = Math.round(month.Total);
                      }
                      return [new Date(month.Day).getTime(), month.Total];
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
                    myConfigDaily["scale-x"]["min-value"] = totalDaily[0][0];
                    myConfigDaily["scale-x"]["step"] = "day";
                    myConfigDaily["scale-x"]["transform"] = {
                      "type": "date",
                      "all": "%m/%d/%y"
                    };
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
                    myConfigDailyStacked["scale-x"]["min-value"] = totalDaily[0][0];
                    myConfigDailyStacked["scale-x"]["step"] = "day";
                    myConfigDailyStacked["scale-x"]["transform"] = {
                      "type": "date",
                      "all": "%m/%d/%y"
                    };
                    i2++;
                    return totalDaily;
                  });
              });
          });
          return mapped;
        })
        .then((mapped) => {
          return Promise.all(mapped)
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
            });
        })
        .then(() => {
          vm.loading = false;
        })
    }

  }
}());
