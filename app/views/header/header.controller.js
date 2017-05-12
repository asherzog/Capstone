(function() {
  'use strict';

  angular
    .module('app')
    .controller('headerController', headerController);

  function headerController($http, $scope, HomeService, waterService, $state) {
    const vm = this;
    vm.$onInit = loadData;
    vm.systems = waterService.allSystems;
    vm.printing = HomeService.printing;
    vm.db = 'Master';
    vm.dbs = ['Master', 'Test'];

    vm.selection = function(db) {
      if (db == 'Master') {
        db = 'testDB';
      };
      let pkg = {
        db
      };
      $http.post('http://localhost:3000/setdb', pkg)
        .then(result => {
          console.log(result);
          waterService.getAllSystems()
            .then(response => {
              waterService.allSystems = response;
              if ($state.current.name == 'addform') {
                $state.go('home');  
              } else {
                $state.reload();
              }
            });
        });
    };

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
