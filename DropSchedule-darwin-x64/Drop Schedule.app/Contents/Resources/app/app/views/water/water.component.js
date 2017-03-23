(function() {
  'use strict';

  angular
    .module('app')
    .component('water', {
      controller: 'waterController',
      templateUrl:'../app/views/water/water.template.html'
    });
}());
