(function() {
  'use strict';

  angular
    .module('app')
    .controller('addFormController', addFormController);

  function addFormController($http, $state, waterService, HomeService, Upload) {
    const vm = this;
    vm.$onInit = loadData;
    vm.createNewWell = createNewWell;
    vm.systems;
    vm.rigs;
    vm.tcs;
    vm.type = "Well";
    vm.form = true;
    vm.formData;

    function createNewWell() {
      if (vm.type == "Well") {
        let well = {
          RIG: vm.rig,
          WELL: vm.name,
          TYPE_CURVE: vm.tc,
          WATER_SYSTEM: vm.system,
          SPUD_SPUD: vm.spudSpud,
        };
        if (vm.system == "CREATE NEW") {
          well['WATER_SYSTEM'] = vm.newSystem;
        }
        if (vm.rig == "CREATE NEW") {
          well['RIG'] = vm.newRig;
        }
        if (vm.spud) {
          well['SPUD'] = HomeService.convertDate(vm.spud, 0);
          HomeService.addNewWell(well)
            .then(() => {
              $state.go('home', {}, {reload: true});
            });
        } else {
          HomeService.getRig(vm.rig)
            .then((response) => {
              if (response.length > 0) {
                let min = new Date(response[0].SPUD);
                response.forEach(well => {
                  if (new Date(well.SPUD).getTime() > min.getTime()) {
                    min = new Date(well.SPUD);
                  }
                });
                well['SPUD'] = HomeService.convertDate(min, Number(vm.spudSpud));
              } else {
                well['SPUD'] = HomeService.convertDate(new Date(), Number(vm.spudSpud));
              }
              return well;
            })
            .then(well => {
              HomeService.addNewWell(well)
                .then(() => {
                  $state.go('home', {}, {reload: true});
                });
            });
        }
      } else {
        if (vm.newPost.file.$valid && vm.file) { //check if form is valid
          let uploadObj = {
            item: vm.type,
            name: vm.name,
            file: vm.file
          };
          upload(uploadObj); //call upload function
        }
      }
    }

    function upload(fileObj) {
      vm.form = false;
      Upload.upload({
        url: 'http://localhost:3000/upload',
        data: fileObj
      }).then(function (response) {
        vm.formData = response.data;
      });
    }

    vm.confirmDetails = function() {
      if (vm.formData.type == 'Type Curve') {
        let newTypeCurve = {
          Days: vm.tcDays,
          Oil: vm.tcOil,
          Water: vm.tcWater,
          Total_Liq: vm.tcTotal
        };
        console.log(newTypeCurve);

        $http.post('http://localhost:3000/upload/update', newTypeCurve)
          .then(response => {
            console.log(response);
            $state.go('home', {}, {reload: true});
          });
      } else {
        let newPdp = {
          PROPNUM: vm.pdpPropNum,
          SCENARIO: vm.pdpScenario,
          LEASE: vm.pdpLease,
          API: vm.pdpApi,
          OUTDATE: vm.pdpDate,
          Gross_Oil_Bbls: vm.pdpOil,
          Gross_Water_Bbls: vm.pdpWater,
          Gross_Gas_Mcf: vm.pdpGas,
          Water_System: vm.pdpSystem
        };
        console.log(newPdp);

        $http.post('http://localhost:3000/upload/update', newPdp)
          .then(response => {
            console.log(response);
            $state.go('home', {}, {reload: true});
          });
      }
    };


    function loadData() {
      waterService.getAllSystems()
        .then(response => {
          vm.systems = response;
          vm.systems.push("CREATE NEW");
        });

      waterService.getAllRigs()
        .then(response => {
          vm.rigs = response;
          vm.rigs.push("CREATE NEW");
        });

      waterService.getAllTc()
        .then(response => {
          vm.tcs = response;
        });
    }


  };
}());
