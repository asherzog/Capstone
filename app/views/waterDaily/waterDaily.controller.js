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
          vm.same = response.data.sort(function(c,d){
            var rx = /(\d+)\/(\d+)\/(\d+)/;
            var a = Number(c.Day.replace(rx, '$3$1$20000'));
            var b = Number(d.Day.replace(rx, '$3$1$20000'));
            return a < b ? -1 : a == b ? 0 : 1;
          });
        });
    }
  };
}());
