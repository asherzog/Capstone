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
    vm.type = "Well"

    function createNewWell() {
      let well = {
        RIG: vm.rig,
        WELL: vm.well,
        WATER_SYSTEM: vm.system,
        TYPE_CURVE: vm.tc,
        SPUD_SPUD: vm.spudSpud,
        SPUD: HomeService.convertDate(vm.spud, 0)
      };
      // console.log(well);
      // HomeService.addNewWell(well)
      //   .then(() => {
      //     $state.go('home');
      //   });
      console.log(vm.type);
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
