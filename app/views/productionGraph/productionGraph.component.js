(function() {
  'use strict';

  angular
    .module('app')
    .component('productionGraph', {
      controller: 'productionGraphController',
      templateUrl:'../app/views/productionGraph/productionGraph.template.html'
    });
}());
