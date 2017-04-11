(function() {
  'use strict';

  angular
    .module('app')
    .controller('waterDailyController', waterDailyController);

  function waterDailyController($http, $state) {
    const vm = this;
    let system = $state.params.water;
    vm.$onInit = loadData;

    vm.orderFunction = function(well) {
      return new Date(well.Day);
    };


    function loadData() {

      $http.get(`http://localhost:3000/waterSystem/daily/${system}`)
        .then(response => {
          vm.same = response.data;
        });
    }
  };
}());
