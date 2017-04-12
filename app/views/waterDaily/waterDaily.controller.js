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
          vm.same = response.data.sort(function(a, b) {
            a = new Date(a.Day);
            b = new Date(b.Day);
            return a<b ? -1 : a>b ? 1 : 0;
          });
        });
    }
  };
}());
