(function() {
  'use strict';

  angular
    .module('app')
    .service('ProductionService', service);

  function service($http) {
    this.getMonthly = function(type) {
      return $http.get(`http://localhost:3000/production/monthly/${type}`)
        .then(response => {
          return response.data;
        });
    };

    this.getDaily = function(type) {
      return $http.get(`http://localhost:3000/production/daily/${type}`)
        .then(response => {
          return response.data;
        });
    };

  };
}());
