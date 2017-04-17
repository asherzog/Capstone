(function() {
  'use strict';

  angular
    .module('app')
    .controller('productionController', productionController);

  function productionController($http, HomeService, waterService, $scope, $window, $state) {
    const vm = this;
    const {ipcRenderer} = require('electron');
    vm.$onInit = loadData;
    vm.type = $state.params.type;

    function loadData() {
      console.log('hi');
    }
  };
}());
