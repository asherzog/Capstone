(function() {
  'use strict';

  angular
    .module('app')
    .service('waterService', service);

  function service($http, HomeService) {
    this.getWaterMonthly = function(system) {
      return $http.get(`http://localhost:3000/waterSystem/${system}`)
        .then(response => {
          return response.data;
        });
    };

    this.getWaterDaily = function(system) {
      return $http.get(`http://localhost:3000/waterSystemDaily/${system}`)
        .then(response => {
          return response.data;
        });
    };


    this.getAllSystems = function() {
      return $http.get(`http://localhost:3000/allsystems`)
        .then(response => {
          return response.data;
        });
    };

    this.getAllRigs = function() {
      return $http.get(`http://localhost:3000/allrigs`)
        .then(response => {
          return response.data;
        });
    };

    this.getAllTc = function() {
      return $http.get(`http://localhost:3000/alltc`)
        .then(response => {
          return response.data;
        });
    };


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
      return $http.get(`http://localhost:3000/${number}`)
            .then((response) => {
              return response.data;
            });
    };

    this.numberWithCommas = function(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    this.getPdpWells = function(system) {
      return $http.get(`http://localhost:3000/pdpwells/${system}`)
        .then(response => {
          return response.data;
        });
    };

  };
}());
