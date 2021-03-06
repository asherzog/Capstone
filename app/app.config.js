(function() {
  'use strict';

  angular.module('app').config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

  function config($stateProvider, $urlRouterProvider, $locationProvider){

    $stateProvider
      .state({
        name: 'home',
        url: '/',
        component: 'home',
      })
      .state({
        name: 'water',
        url: '/water/{water:string}',
        component: 'water',
      })
      .state({
        name: 'graphs',
        url: '/graphs',
        component: 'graphs'
      })
      .state({
        name: 'addForm',
        url: '/add',
        component: 'addForm'
      })
      .state({
        name: 'tc',
        url: '/tc',
        component: 'tc'
      })
      .state({
        name: 'pdp',
        url: '/pdp',
        component: 'pdp'
      })
      .state({
        name: 'production',
        url: '/production/{type:string}',
        component: 'production'
      })
    $urlRouterProvider.otherwise('/');
  }
}());
