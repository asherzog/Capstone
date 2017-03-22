(function() {
  'use strict';

  angular
    .module('app')
    .component('graphs', {
      controller: 'graphsController',
      templateUrl:'../app/views/graphs/graphs.template.html'
    });
}());
