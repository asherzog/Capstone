(function() {
  'use strict';

  angular
    .module('app')
    .component('addForm', {
      controller: 'addFormController',
      templateUrl:'../app/views/addForm/addForm.template.html'
    });
}());
