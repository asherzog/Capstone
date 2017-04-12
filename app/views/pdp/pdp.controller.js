(function() {
  'use strict';

  angular
    .module('app')
    .controller('pdpController', pdpController);

  function pdpController($http, HomeService, waterService, $scope, $window, $state) {
    const vm = this;
    const {ipcRenderer} = require('electron');
    vm.$onInit = loadPdp;
    vm.pdp;
    vm.pdps;
    vm.data;
    vm.keys;
    vm.btnText = true;
    vm.editing = false;
    vm.blur = editing;


    vm.selection = function(name) {
      waterService.getPdpByName(vm.pdp)
        .then(results => {
          vm.data = results.map(pdp => {
            return {
              "PROPNUM": pdp.PROPNUM,
              "SCENARIO": pdp["SCENARIO"],
              "LEASE": pdp["LEASE"],
              "API": pdp["API"],
              "OUTDATE": pdp["OUTDATE"],
              "Gross_Oil_Bbls": pdp["Gross_Oil_Bbls"],
              "Gross_Water_Bbls": pdp["Gross_Water_Bbls"],
              "Gross_Gas_Mcf": pdp["Gross_Gas_Mcf"],
              "Water_System": pdp["Water_System"]
            };
          });
          vm.keys = Object.keys(results[0]);
        });
    };

    vm.deletePdp = function() {
      if (confirm(`Delete ${vm.pdp}?`)) {
        console.log('deleted');
        let pdp = vm.pdp;
        vm.pdps.indexOf(pdp) != 0 ? vm.pdp = vm.pdps[0] : vm.pdp = vm.pdps[vm.pdps.length -1];
        vm.selection(vm.pdp);
        vm.pdps.splice(vm.pdps.indexOf(pdp),1);
      }
    };

    function loadPdp() {
      waterService.getAllPdp()
        .then(pdps => {
          vm.pdp = pdps[0];
          vm.pdps = pdps;
        })
        .then(() => {
          vm.selection(vm.pdp);
        });
    };

    function editing(well, value, column) {
      console.log(well);
      console.log(value);
      console.log(column);
      delete well.editing;
    }

  };
}());