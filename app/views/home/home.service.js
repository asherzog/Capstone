(function() {
  'use strict';

  angular
    .module('app')
    .service('HomeService', service);

  function service($http) {

    this.addNewWell = function(well) {
      return $http.post('http://localhost:3000/wells', well)
        .then((response) => {
          console.log(response);
        });
    };


    this.getAllWells = function() {
      return $http.get('http://localhost:3000/wells')
            .then((response) => {
              return response.data;
            });
    };

    this.getPdp = function() {
      return $http.get('http://localhost:3000/pdp')
            .then((response) => {
              return response.data;
            });
    };

    this.updateWells = function(well) {
      return $http.patch(`http://localhost:3000/wells/${well._id}`, well)
            .then((response) => {
              return response;
            });
    };

    this.convertDate = function(strDate, days) {
      let someDate = new Date(strDate);
      someDate.setDate(someDate.getDate() + days);
      return strDate = ('0' +(someDate.getMonth()+1)).slice(-2) + "/" + ('0' + someDate.getDate()).slice(-2) + "/" + someDate.getFullYear();
    };

  };
}());
