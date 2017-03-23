(function() {
  'use strict';

  angular
    .module('app')
    .component('headerComponent', {
      controller: 'headerController',
      templateUrl:'../app/views/header/header.template.html'
    });
}());
