(function() {
  'use strict';

  angular
    .module('app')
    .component('tc', {
      controller: 'tcController',
      templateUrl:'../app/views/tc/tc.template.html'
    });
}());
