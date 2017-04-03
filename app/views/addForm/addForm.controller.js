(function() {
  'use strict';

  angular
    .module('app')
    .controller('addFormController', addFormController);

  function addFormController($http, $state, waterService, HomeService) {
    const vm = this;
    vm.$onInit = loadData;
    vm.createNewWell = createNewWell;
    vm.systems;
    vm.rigs;
    vm.tcs;
    vm.type = "Well";

    function createNewWell() {
      if (vm.type == "Well") {
        let well = {
          RIG: vm.rig,
          WELL: vm.name,
          WATER_SYSTEM: vm.system,
          TYPE_CURVE: vm.tc,
          SPUD_SPUD: vm.spudSpud,
        };
        if (vm.spud) {
          well['SPUD'] = HomeService.convertDate(vm.spud, 0);
        } else {
          HomeService.getRig(vm.rig)
            .then((response) => {
              let min = new Date(response[0].SPUD);
              response.forEach(well => {
                if (new Date(well.SPUD).getTime() > min.getTime()) {
                  min = new Date(well.SPUD);
                }
              });
              well['SPUD'] = HomeService.convertDate(min, Number(vm.spudSpud));
              return well;
            })
            .then(well => {
              // HomeService.addNewWell(well)
              //   .then(() => {
              //     $state.go('home');
              //   });
              console.log(well);
            });
        }
      } else if (vm.type == "Rig") {
        console.log(vm.name);
      }
    }


    function loadData() {
      waterService.getAllSystems()
        .then(response => {
          vm.systems = response;
        });

      waterService.getAllRigs()
        .then(response => {
          vm.rigs = response;
        });

      waterService.getAllTc()
        .then(response => {
          vm.tcs = response;
        });
    }


  };
}());
