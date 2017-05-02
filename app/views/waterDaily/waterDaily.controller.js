(function() {
  'use strict';

  angular
    .module('app')
    .controller('waterDailyController', waterDailyController);

  function waterDailyController($http, $state, waterService) {
    const vm = this;
    let system = $state.params.water;
    vm.$onInit = loadData;
    vm.displayed = 50;
    let newNum = waterService.numberWithCommas;

    vm.loadMore = function() {
      vm.displayed += 20;
    };

    vm.orderFunction = function(well) {
      return new Date(well.Day);
    };


    function loadData() {

      $http.get(`http://localhost:3000/waterSystem/daily/${system}`)
        .then(response => {
          vm.same = response.data.map(month => {
            month.New_Wells = newNum(month.New_Wells);
            month.PDP = newNum(month.PDP);
            month.Total = newNum(month.Total);
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
