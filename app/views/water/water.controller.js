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
      $http.get(`http://localhost:3000/waterSystem/monthly/${system}`)
        .then(response => {
          vm.same = response.data.sort(function(c,d){
            var rx = /(\d+)\/(\d+)\/(\d+)/;
            var a = Number(c.Month.replace(rx, '$3$1$20000'));
            var b = Number(d.Month.replace(rx, '$3$1$20000'));
            return a < b ? -1 : a == b ? 0 : 1;
          });
        });
    }
  };
}());
