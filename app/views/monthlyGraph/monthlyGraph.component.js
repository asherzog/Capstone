(function() {
  'use strict';

  angular
    .module('app')
    .component('monthlyGraph', {
      controller: 'monthlyGraphController',
      templateUrl:'../app/views/monthlyGraph/monthlyGraph.template.html'
    });
}());
