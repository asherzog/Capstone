(function() {
  'use strict';

  angular
    .module('app')
    .controller('homeController', homeController);

  function homeController($http, HomeService) {
    const vm = this;
    vm.newRigs;
    vm.btnText = true;
    vm.editting = false;
    vm.blur = editing;
    vm.$onInit = loadData;


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
          rig.Wells = alasql('SELECT * FROM ? ORDER BY SPUD',[rig.Wells]);
        });
        vm.newRigs = rigs;
        vm.keys = Object.keys(vm.newRigs[0].Wells[0]);
        vm.options = {
          disabled: false,
          connectWith: '.rig',
          scroll: true,
          stop: updateTable,
          placeholder: "sortable-placeholder"
        };
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
              if (key == 'SPUD-SPUD') {
                for (var k = (j); k < vm.newRigs[i].Wells.length; k++) {
                  vm.newRigs[i].Wells[k].SPUD = HomeService.convertDate(vm.newRigs[i].Wells[k -1].SPUD, +vm.newRigs[i].Wells[k]["SPUD-SPUD"]);
                  HomeService.updateWells(vm.newRigs[i].Wells[k]).then(response => {
                    console.log(response);
                  });
                }
              }
            }
            HomeService.updateWells(vm.newRigs[i].Wells[j]).then(response => {
              console.log(response);
            });
          }
        }
      }
    };

    function updateTable(e, ui) {
      vm.first = false;
      let rigArr = ui.item.sortable.droptargetModel;
      let dropIndex = ui.item.sortable.dropindex;
      rigArr[dropIndex].COMPLETION = null;

      if (rigArr[0].RIG == "Rig 1" && rigArr[1].RIG == "Rig 1" || rigArr[1].RIG == "Rig 1" && rigArr[2].RIG == "Rig 1") {
        rigArr[dropIndex].RIG = "Rig 1";
        for (var i = dropIndex; i < rigArr.length; i++) {
          if (i > 0) {
            rigArr[i].SPUD = HomeService.convertDate(rigArr[i -1].SPUD, +rigArr[i]['SPUD-SPUD']);
          }
          HomeService.updateWells(rigArr[i]).then(response => {console.log(response);});
        }
        vm.newRigs[0].Wells = rigArr;
      } else {
        rigArr[dropIndex].RIG = "Rig 2";
        for (var i = dropIndex; i < rigArr.length; i++) {
          if (i > 0) {
            rigArr[i].SPUD = HomeService.convertDate(rigArr[i -1].SPUD, +rigArr[i]['SPUD-SPUD']);
          }
          HomeService.updateWells(rigArr[i]).then(response => {console.log(response);});
        }
        vm.newRigs[1].Wells = rigArr;
      }
    };

  };
}());
