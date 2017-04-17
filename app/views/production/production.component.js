(function() {
  'use strict';

  angular
    .module('app')
    .component('production', {
      controller: 'productionController',
      templateUrl:'../app/views/production/production.template.html'
    });
}());
