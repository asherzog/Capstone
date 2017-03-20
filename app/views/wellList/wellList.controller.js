(function() {
  'use strict';

  angular
    .module('app')
    .controller('wellListController', wellListController);

  function wellListController($http, $state, waterService, HomeService) {
    const vm = this;
    let system = $state.params.water;
    vm.wells = [];

    vm.orderFunction = function(well) {
      if (well.Completion == 'PDP') {
        return new Date('10/10/2050')
      }
      return new Date(well.Completion);
    };


    waterService.getWaterSystem(system)
      .then(response => {
        vm.newWells = response.map(well => {
          if (!well.COMPLETION) {
            well.COMPLETION = HomeService.convertDate(well.SPUD, 60);
          }
          vm.wells.push({
            Well: well.WELL,
            Type: well.TYPE_CURVE,
            Completion: well.COMPLETION
          });
          return well.WELL;
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
