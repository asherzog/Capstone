(function() {
  'use strict';

  angular
    .module('app')
    .controller('homeController', homeController);

  function homeController($http, HomeService, waterService, $scope, $window, $state) {
    const vm = this;
    const {ipcRenderer} = require('electron');
    vm.newRigs;
    vm.btnText = true;
    vm.editting = false;
    vm.blur = editing;
    vm.$onInit = loadData;
    vm.printing = 'table-responsive';
    vm.delete = deleteWell;
    vm.options = {
      disabled: false,
      connectWith: '.rig',
      scroll: true,
      stop: updateTable,
      placeholder: "sortable-placeholder"
    };

    vm.printer = function() {
      vm.printing = '';
      ipcRenderer.send('printingHome', 'ping')
      ipcRenderer.on('wrote-pdf', function (event, path) {
        vm.printing = 'table-responsive';
        $scope.$apply();
        // document.getElementById('pdf-path').innerHTML = message
      });
    };


    function loadData() {
      HomeService.getAllWells().then(response => {
        let rigs = alasql('SELECT RIG, ARRAY(_) AS Wells FROM ? GROUP BY RIG',[response]);
        vm.systems = [];
        rigs.forEach(rig => {
          rig.Wells.forEach(well => {
            delete well.editing;
            well.SPUD = HomeService.convertDate(well.SPUD, 0);
            if (well.COMPLETION) {
              well.COMPLETION = HomeService.convertDate(well.COMPLETION, 0);
            }
            if (vm.systems.indexOf(well.WATER_SYSTEM) == -1)
              vm.systems.push(well.WATER_SYSTEM);
          });
          rig.Wells = alasql('SELECT * FROM ? ORDER BY new Date(SPUD)',[rig.Wells]);
        });
        vm.newRigs = rigs;
        vm.keys = Object.keys(vm.newRigs[0].Wells[0]);
        waterService.getAllSystems()
          .then(response => {
            waterService.allSystems = response;
          });
      });
    };

    function editing(well, value, column) {
      for (var i = 0; i < vm.newRigs.length; i++) {
        for (var j = 0; j < vm.newRigs[i].Wells.length; j++) {
          delete vm.newRigs[i].Wells[j].editing;
          if (vm.newRigs[i].Wells[j]._id == well._id) {
            for(var key in column) {
              vm.newRigs[i].Wells[j][key] = value;
              if (key == 'SPUD'){
                for (var k = (j + 1); k < vm.newRigs[i].Wells.length; k++) {
                  vm.newRigs[i].Wells[k].SPUD = HomeService.convertDate(vm.newRigs[i].Wells[k -1].SPUD, +vm.newRigs[i].Wells[k]["SPUD-SPUD"]);
                  HomeService.updateWells(vm.newRigs[i].Wells[k]).then(response => {
                    console.log(response);
                  });
                }
              }
              if (key == 'RIG'){
                for (var k = (j + 1); k < vm.newRigs[i].Wells.length; k++) {
                  vm.newRigs[i].Wells[k].SPUD = HomeService.convertDate(vm.newRigs[i].Wells[k -1].SPUD, +vm.newRigs[i].Wells[k]["SPUD-SPUD"]);
                  HomeService.updateWells(vm.newRigs[i].Wells[k]).then(response => {
                    console.log(response);
                  });
                }
              }
              if (key == 'SPUD-SPUD') {
                for (var k = (j); k < vm.newRigs[i].Wells.length; k++) {
                  vm.newRigs[i].Wells[k].SPUD = HomeService.convertDate(vm.newRigs[i].Wells[k -1].SPUD, +vm.newRigs[i].Wells[k]["SPUD-SPUD"]);
                  HomeService.updateWells(vm.newRigs[i].Wells[k]).then(response => {
                    console.log(response);
                  });
                }
              }
              if (key == 'WATER_SYSTEM') {
                // if (waterService.allSystems.indexOf(well.WATER_SYSTEM) == -1) {
                //   waterService.allSystems.push(well.WATER_SYSTEM);
                // }
              }
            }
            HomeService.updateWells(vm.newRigs[i].Wells[j]).then(response => {
              console.log(response);
            });
          }
        }
      }
      loadData();
      waterService.getAllSystems()
        .then(response => {
          waterService.allSystems = response;
        });
    };

    function updateTable(e, ui) {
      vm.first = false;
      let rigArr = ui.item.sortable.droptargetModel;
      let dropIndex = ui.item.sortable.dropindex;
      rigArr[dropIndex].COMPLETION = null;
      if (dropIndex != 0) {
        rigArr[dropIndex].RIG = rigArr[0].RIG;
        for (var i = dropIndex; i < rigArr.length; i++) {
          if (i > 0) {
            rigArr[i].SPUD = HomeService.convertDate(rigArr[i -1].SPUD, +rigArr[i]['SPUD-SPUD']);
          }
          HomeService.updateWells(rigArr[i]).then(response => {console.log(response);});
        }
        vm.newRigs[0].Wells = rigArr;
      } else {
        rigArr[dropIndex].RIG = rigArr[1].RIG;
        for (var i = dropIndex; i < rigArr.length; i++) {
          if (i > 0) {
            rigArr[i].SPUD = HomeService.convertDate(rigArr[i -1].SPUD, +rigArr[i]['SPUD-SPUD']);
          }
          HomeService.updateWells(rigArr[i]).then(response => {console.log(response);});
        }
      }
    };

    function deleteWell(well) {
      if (confirm(`Delete ${well.WELL}?`)) {
        vm.newRigs.forEach(rig => {
          if (rig.RIG == well.RIG) {
            rig.Wells.splice(rig.Wells.indexOf(well), 1);
          }
        });
        HomeService.deleteWell(well['_id'])
          .then(response => {
            console.log(response);
            $state.reload();
          });
      }
    };

  };
}());
