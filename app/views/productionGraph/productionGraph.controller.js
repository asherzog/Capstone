(function() {
  'use strict';

  angular
    .module('app')
    .controller('productionGraphController', productionGraphController);

  function productionGraphController($http, $state, ProductionService, HomeService, $scope) {
    const vm = this;
    vm.$onInit = loadData;
    vm.printing = false;
    vm.printingMargins = '';
    const {ipcRenderer} = require('electron');


    vm.printer = function() {
      vm.printing = true;
      vm.printingMargins = 'pMargins';
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
          "text":"Monthly BO",
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
      var myConfig2 = {
        "background-color":"white",
        "type":"line",
        "title":{
          "text":"Monthly BOE",
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
      var myConfig3 = {
        "background-color":"white",
        "type":"line",
        "title":{
          "text":"Daily BO",
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
      var myConfig4 = {
        "background-color":"white",
        "type":"line",
        "title":{
          "text":"Daily BOE",
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
      ProductionService.getMonthly($state.params.type.toLowerCase())
        .then(data => {
          let pdpBo = data.map(month => {
            if (typeof month.PDP_Oil != 'number') {
              month.PDP_Oil = Number(month.PDP_Oil.replace(',',''));
            }
            return [month.Month, month.PDP_Oil];
          });
          let newBo = data.map(month => {
            if (typeof month.New_Wells_Oil != 'number') {
              month.New_Wells_Oil = Number(month.New_Wells_Oil.replace(',',''));
            }
            return [month.Month, month.New_Wells_Oil];
          });
          let totalBo = data.map(month => {
            if (typeof month.Total_Oil != 'number') {
              month.Total_Oil = Number(month.Total_Oil.replace(',',''));
            }
            return [month.Month, month.Total_Oil];
          });
          let pdpBoe = data.map(month => {
            if (typeof month.PDP_BOE != 'number') {
              month.PDP_BOE = Number(month.PDP_BOE.replace(',',''));
            }
            return [month.Month, month.PDP_BOE];
          });
          let newBoe = data.map(month => {
            if (typeof month.New_Wells_BOE != 'number') {
              month.New_Wells_BOE = Number(month.New_Wells_BOE.replace(',',''));
            }
            return [month.Month, month.New_Wells_BOE];
          });
          let totalBoe = data.map(month => {
            if (typeof month.Total_BOE != 'number') {
              month.Total_BOE = Number(month.Total_BOE.replace(',',''));
            }
            return [month.Month, month.Total_BOE];
          });
          myConfig["series"].push({
            "aspect": "spline",
            "values": pdpBo,
            "text": 'PDP_Oil',
            "line-color": "#ff6666",
            "marker":{
              "background-color":"#ff6666",
              "border-color":"#ff6666"
            }
          });
          myConfig["series"].push({
            "aspect": "spline",
            "values": newBo,
            "text": 'New_Wells_Oil',
            "line-color": "#00abb0",
            "marker":{
              "background-color":"#00abb0",
              "border-color":"#00abb0"
            }
          });
          myConfig["series"].push({
            "aspect": "spline",
            "values": totalBo,
            "text": 'Total_Oil',
            "line-color": "#6e9cdb",
            "marker":{
              "background-color":"#6e9cdb",
              "border-color":"#6e9cdb"
            }
          });
          myConfig2["series"].push({
            "aspect": "spline",
            "values": pdpBoe,
            "text": 'PDP_BOE',
            "line-color": "#ff6666",
            "marker":{
              "background-color":"#ff6666",
              "border-color":"#ff6666"
            }
          });
          myConfig2["series"].push({
            "aspect": "spline",
            "values": newBoe,
            "text": 'New_Wells_BOE',
            "line-color": "#00abb0",
            "marker":{
              "background-color":"#00abb0",
              "border-color":"#00abb0"
            }
          });
          myConfig2["series"].push({
            "aspect": "spline",
            "values": totalBoe,
            "text": 'Total_BOE',
            "line-color": "#6e9cdb",
            "marker":{
              "background-color":"#6e9cdb",
              "border-color":"#6e9cdb"
            }
          });
        })
        .then(() => {
          ProductionService.getDaily($state.params.type.toLowerCase())
          .then(data => {
            let pdpBo = data.map(Day => {
              if (typeof Day.PDP_Oil != 'number') {
                Day.PDP_Oil = Number(Day.PDP_Oil.replace(',',''));
              }
              return [Day.Day, Day.PDP_Oil];
            });
            let newBo = data.map(Day => {
              if (typeof Day.New_Wells_Oil != 'number') {
                Day.New_Wells_Oil = Number(Day.New_Wells_Oil.replace(',',''));
              }
              return [Day.Day, Day.New_Wells_Oil];
            });
            let totalBo = data.map(Day => {
              if (typeof Day.Total_Oil != 'number') {
                Day.Total_Oil = Number(Day.Total_Oil.replace(',',''));
              }
              return [Day.Day, Day.Total_Oil];
            });
            let pdpBoe = data.map(Day => {
              if (typeof Day.PDP_BOE != 'number') {
                Day.PDP_BOE = Number(Day.PDP_BOE.replace(',',''));
              }
              return [Day.Day, Day.PDP_BOE];
            });
            let newBoe = data.map(Day => {
              if (typeof Day.New_Wells_BOE != 'number') {
                Day.New_Wells_BOE = Number(Day.New_Wells_BOE.replace(',',''));
              }
              return [Day.Day,Day.New_Wells_BOE];
            });
            let totalBoe = data.map(Day => {
              if (typeof Day.Total_BOE != 'number') {
                Day.Total_BOE = Number(Day.Total_BOE.replace(',',''));
              }
              return [Day.Day, Day.Total_BOE];
            });
            myConfig3["series"].push({
              "aspect": "spline",
              "values": pdpBo,
              "text": 'PDP_Oil',
              "line-color": "#ff6666",
              "marker":{
                "background-color":"#ff6666",
                "border-color":"#ff6666"
              }
            });
            myConfig3["series"].push({
              "aspect": "spline",
              "values": newBo,
              "text": 'New_Wells_Oil',
              "line-color": "#00abb0",
              "marker":{
                "background-color":"#00abb0",
                "border-color":"#00abb0"
              }
            });
            myConfig3["series"].push({
              "aspect": "spline",
              "values": totalBo,
              "text": 'Total_Oil',
              "line-color": "#6e9cdb",
              "marker":{
                "background-color":"#6e9cdb",
                "border-color":"#6e9cdb"
              }
            });
            myConfig4["series"].push({
              "aspect": "spline",
              "values": pdpBoe,
              "text": 'PDP_BOE',
              "line-color": "#ff6666",
              "marker":{
                "background-color":"#ff6666",
                "border-color":"#ff6666"
              }
            });
            myConfig4["series"].push({
              "aspect": "spline",
              "values": newBoe,
              "text": 'New_Wells_BOE',
              "line-color": "#00abb0",
              "marker":{
                "background-color":"#00abb0",
                "border-color":"#00abb0"
              }
            });
            myConfig4["series"].push({
              "aspect": "spline",
              "values": totalBoe,
              "text": 'Total_BOE',
              "line-color": "#6e9cdb",
              "marker":{
                "background-color":"#6e9cdb",
                "border-color":"#6e9cdb"
              }
            });
            zingchart.render({
              id : 'myChart',
              data : myConfig,
              height: "100%",
              width: "100%"
            });
            zingchart.render({
              id : 'myChart3',
              data : myConfig2,
              height: "100%",
              width: "100%"
            });
            zingchart.render({
              id : 'myChart2',
              data : myConfig3,
              height: "100%",
              width: "100%"
            });
            zingchart.render({
              id : 'myChart4',
              data : myConfig4,
              height: "100%",
              width: "100%"
            });
            document.getElementById('loading').remove("loader");
          });
        });
    }
  }
}());
