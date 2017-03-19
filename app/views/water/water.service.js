(function() {
  'use strict';

  angular
    .module('app')
    .service('waterService', service);

  function service($http, HomeService) {
    this.getWaterSystem = function(name) {
      return $http.get(`http://localhost:3000/water/${name}`)
            .then((response) => {
              response.data.forEach(well => {
                if (well.SPUD) {
                  well.SPUD = HomeService.convertDate(well.SPUD, 0);
                }
                if (well.COMPLETION) {
                  well.COMPLETION = HomeService.convertDate(well.COMPLETION, 0);
                }
              });
              return response.data;
            });
    };

    this.getPdp = function(name) {
      return $http.get(`http://localhost:3000/pdp/${name}`)
            .then((response) => {
              response.data.forEach(month => {
                month._id.Date = HomeService.convertDate(month._id.Date, 0);
              });
              response.data.sort( function(c,d){
                var rx = /(\d+)\/(\d+)\/(\d+)/;
                var a = Number(c._id.Date.replace(rx, '$3$1$20000'));
                var b = Number(d._id.Date.replace(rx, '$3$1$20000'));
                return a < b ? -1 : a == b ? 0 : 1;
              });
              return response.data;
            });
    };

    this.getTc = function(number) {
      return $http.get(`http://localhost:3000/tc${number}`)
            .then((response) => {
              return response.data;
            });
    };

  };
}());
