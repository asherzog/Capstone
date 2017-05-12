(function() {
  'use strict';

  angular
    .module('app')
    .controller('waterController', waterController);

  function waterController($http, $state, waterService, HomeService) {
    const vm = this;
    let system = $state.params.water;
    vm.$onInit = loadData;
    let newNum = waterService.numberWithCommas;

    function loadData() {
      $http.get(`http://localhost:3000/waterSystem/monthly/${system}`)
        .then(response => {
          vm.same = response.data.map(month => {
            month.New_Wells = newNum(Math.round(month.New_Wells));
            month.PDP = newNum(Math.round(month.PDP));
            month.Total = newNum(Math.round(month.Total));
            return month;
          }).sort(function(a, b) {
            a = new Date(a.Month);
            b = new Date(b.Month);
            return a<b ? -1 : a>b ? 1 : 0;
          });
        });
    }
  };
}());
