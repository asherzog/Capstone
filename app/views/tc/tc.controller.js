(function() {
  'use strict';

  angular
    .module('app')
    .controller('tcController', tcController);

  function tcController($http, HomeService, waterService, $scope, $window, $state) {
    const vm = this;
    const {ipcRenderer} = require('electron');
    vm.$onInit = loadTcs;
    vm.tcs;
    vm.data;
    vm.keys;
    vm.btnText = true;
    vm.editting = false;
    vm.blur = editing;
    vm.displayed = 50;

    vm.loadMore = function() {
      vm.displayed += 20;
    };

    vm.selection = function(tc) {
      vm.displayed = 50;
      waterService.getTc(tc)
        .then(response => {
          // vm.data = response[0].data;
          vm.keys = Object.keys(response[0].data[0]);
          vm.data = response[0].data.map(day => {
            Object.keys(response[0].data[0]).forEach(key => {
              if (typeof day[key] == 'number') {
                day[key] = waterService.numberWithCommas(Math.round(day[key]));
              } else {
                day[key] = day[key];
              }
            });
            return day;
          });
          return vm.data;
        });
    };

    vm.deleteTc = function() {
      if (confirm(`Delete ${vm.tc}?`)) {
        console.log('deleted');
        let tc = vm.tc;
        vm.tcs.indexOf(tc) != 0 ? vm.tc = vm.tcs[0] : vm.tc = vm.tcs[vm.tcs.length -1];
        vm.selection(vm.tc);
        vm.tcs.splice(vm.tcs.indexOf(tc),1);
      }
    };

    function editing(well, value, column) {
      delete well.editing;
      // console.log(well);
      // $http.patch(`http://localhost:3000/tc/${well.TC}`, well)
      //   .then(result => {
      //     console.log(result);
      //   })
      well.Total_Liq = waterService.numberWithCommas((Number(well.Oil.replace(',', '')) + Number(well.Water.replace(',',''))));
    }

    function loadTcs() {
      waterService.getAllTc()
        .then(response => {
          vm.tcs = response;
          vm.tc = vm.tcs[0];
          return vm.tc;
        })
        .then(tc => {
          vm.selection(tc);
        });
    }

  };
}());
