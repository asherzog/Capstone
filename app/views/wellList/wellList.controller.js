(function() {
  'use strict';

  angular
    .module('app')
    .controller('wellListController', wellListController);

  function wellListController($http, $state, waterService, HomeService) {
    const vm = this;
    let system = $state.params.water;
    vm.system = system;
    vm.wells = [];

    vm.orderFunction = function(well) {
      if (well.Completion == 'PDP') {
        return new Date('10/10/2050');
      }
      return new Date(well.First_Production);
    };


    waterService.getWaterSystem(system)
      .then(response => {
        vm.newWells = response.map(well => {
          if (well.RIG != 'Bullpen') {
            if (!well.First_Production) {
              if (well.COMPLETION) {
                well.First_Production = HomeService.convertDate(well.COMPLETION, 7);
              } else {
                well.First_Production = HomeService.convertDate(well.SPUD, 67);
              }
            }
            vm.wells.push({
              Well: well.WELL,
              Type: well.TYPE_CURVE,
              First_Production: well.First_Production
            });
            return well.WELL;
          }
        });
        return vm.newWells;
      })
      .then(() => {
        waterService.getPdpWells(system)
          .then(response => {
            vm.pdp = response.map(well => {
              return vm.wells.push({
                Well: well,
                Type: 'PDP',
                Completion: 'PDP'
              });
            });
            return vm.pdp;
          });
      });
  };
}());
