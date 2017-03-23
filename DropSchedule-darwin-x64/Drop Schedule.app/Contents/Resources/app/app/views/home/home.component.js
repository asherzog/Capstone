(function() {
  'use strict';

  angular
    .module('app')
    .component('home', {
      controller: 'homeController',
      templateUrl:'../app/views/home/home.template.html'
    });
}());
