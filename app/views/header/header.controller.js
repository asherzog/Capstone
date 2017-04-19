(function() {
  'use strict';

  angular
    .module('app')
    .controller('headerController', headerController);

  function headerController($http, $scope, HomeService, waterService) {
    const vm = this;
    vm.$onInit = loadData;
    vm.systems = waterService.allSystems;
    vm.printing = HomeService.printing;

    $scope.$watch(function() {
      return waterService.allSystems;
    }, function(newValue) {
      vm.systems = newValue;
    });

    $scope.$watch(function() {
      return HomeService.printing;
    }, function(newValue) {
      vm.printing = newValue;
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
