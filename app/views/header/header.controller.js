(function() {
  'use strict';

  angular
    .module('app')
    .controller('headerController', headerController);

  function headerController($http, $scope, HomeService, waterService) {
    const vm = this;
    vm.$onInit = loadData;
    vm.systems = waterService.allSystems;

    $scope.$watch(function() {
      return waterService.allSystems;
    }, function(newValue) {
      vm.systems = newValue;
    });

    function loadData() {
      waterService.getAllSystems()
        .then(response => {
          return response.forEach(system => {
            waterService.allSystems.push(system);
          });
        });
    };

  };
}());
