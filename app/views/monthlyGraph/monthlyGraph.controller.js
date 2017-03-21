(function() {
  'use strict';

  angular
    .module('app')
    .controller('monthlyGraphController', monthlyGraphController);

  function monthlyGraphController($http, $state, waterService, HomeService) {
    const vm = this;
    let system = $state.params.water;
    
  };
}());
