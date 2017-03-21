(function() {
  'use strict';

  angular
    .module('app')
    .controller('waterController', waterController);

  function waterController($http, $state, waterService, HomeService) {
    const vm = this;
    let system = $state.params.water;
    vm.$onInit = loadData;

    function loadData() {
      $http.get(`http://localhost:3000/waterSystem/${system}`)
        .then(response => {
          vm.same = response.data;
        });
    }
  };
}());
