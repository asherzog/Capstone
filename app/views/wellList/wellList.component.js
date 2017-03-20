(function() {
  'use strict';

  angular
    .module('app')
    .component('wellList', {
      controller: 'wellListController',
      templateUrl:'../app/views/wellList/wellList.template.html'
    });
}());
