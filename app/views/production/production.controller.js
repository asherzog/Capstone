(function() {
  'use strict';

  angular
    .module('app')
    .controller('productionController', productionController);

  function productionController($http, ProductionService, $state, waterService) {
    const vm = this;
    // const {ipcRenderer} = require('electron');
    vm.$onInit = loadData;
    vm.type = $state.params.type;
    vm.monthlyData;
    vm.dailyData;
    vm.btnText = true;
    vm.daily = false;
    vm.displayed = 50;
    vm.loadMore = loadMore;

    function loadData() {
      ProductionService.getMonthly($state.params.type.toLowerCase())
        .then(data => {
          vm.monthlyData = data;
        })
        .then(() => {
          ProductionService.getDaily($state.params.type.toLowerCase())
          .then(data => {
            vm.dailyData = data;
          });
        });
    };

    function loadMore() {
      vm.displayed += 20;
    };

  };
}());
