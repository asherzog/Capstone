(function() {
  'use strict';

  angular
    .module('app')
    .controller('pdpController', pdpController);

  function pdpController($http, HomeService, waterService, $scope, $window, $state) {
    const vm = this;
    const {ipcRenderer} = require('electron');



  };
}());
