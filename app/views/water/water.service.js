(function() {
  'use strict';

  angular
    .module('app')
    .service('waterService', service);

  function service($http, HomeService) {
    this.getWaterMonthly = function(system) {
      return $http.get(`http://localhost:3000/waterSystem/monthly/${system}`)
        .then(response => {
          return response.data;
        });
    };

    this.getWaterDaily = function(system) {
      return $http.get(`http://localhost:3000/waterSystem/daily/${system}`)
        .then(response => {
          return response.data;
        });
    };

    this.allSystems = [];

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

    this.getAllPdp = function() {
      return $http.get(`http://localhost:3000/allpdp`)
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
              response.data.sort(function(a, b) {
                a = new Date(a._id.Date);
                b = new Date(b._id.Date);
                return a<b ? -1 : a>b ? 1 : 0;
              });
              return response.data;
            });
    };

    this.getPdpByName = function(name) {
      return $http.get(`http://localhost:3000/pdp/lease/${name}`)
            .then((response) => {
              response.data.sort(function(a, b) {
                a = new Date(a.OUTDATE);
                b = new Date(b.OUTDATE);
                return a<b ? -1 : a>b ? 1 : 0;
              });
              return response.data;
            });
    };

    this.getTc = function(name) {
      return $http.get(`http://localhost:3000/tc/${name}`)
            .then((response) => {
              return response.data;
            });
    };

    this.numberWithCommas = function(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    this.getPdpWells = function(system) {
      return $http.get(`http://localhost:3000/pdp/wells/${system}`)
        .then(response => {
          return response.data;
        });
    };

  };
}());
