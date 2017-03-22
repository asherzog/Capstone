(function() {
  'use strict';

  angular
    .module('app')
    .controller('headerController', headerController);

  function headerController($http, HomeService, waterService) {
    const vm = this;
    vm.$onInit = loadData;

    function loadData() {
      waterService.getAllSystems()
        .then(response => {
          vm.systems = response;
        });
    };

  };
}());
