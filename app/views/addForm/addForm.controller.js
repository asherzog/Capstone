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
          NRI: vm.nri,
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
                let spudSpud = response[0]['SPUD-SPUD'];
                response.forEach(well => {
                  if (new Date(well.SPUD).getTime() > min.getTime()) {
                    min = new Date(well.SPUD);
                    spudSpud = vm.spudSpud;
                  }
                });
                well['SPUD'] = HomeService.convertDate(min, Number(spudSpud));
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
          upload(uploadObj, 'upload', false); //call upload function
        }
      }
    }

    vm.bulkLoad = function() {
      if (vm.bulk.bulkFile.$valid && vm.bulkFile) { //check if form is valid
        let uploadObj = {
          item: vm.type,
          file: vm.bulkFile
        };
        return upload(uploadObj, `upload/wells`, true) //call upload function
          .then((data) => {
            console.log(data);
            return data;
          })
          .then(() => {
            $state.go('home');
          });
      }
    };

    function upload(fileObj, url, bool) {
      vm.form = bool;
      return Upload.upload({
        url: `http://localhost:3000/${url}`,
        data: fileObj
      }).then(function (response) {
        vm.formData = response.data;
        return vm.formData;
      });
    }

    vm.confirmDetails = function() {
      if (vm.formData.type == 'Type Curve') {
        let newTypeCurve = {
          Days: vm.tcDays,
          Oil: vm.tcOil,
          Water: vm.tcWater,
          Gas: vm.tcGas,
          Total_Liq: 'Total_Liq'
        };

        $http.post('http://localhost:3000/upload/update', newTypeCurve)
          .then(response => {
            console.log(response);
            $state.go('home', {}, {reload: true});
          });
      } else {
        let newPdp = {
          LEASE: vm.pdpLease,
          OUTDATE: vm.pdpDate,
          Gross_Oil_Bbls: vm.pdpOil,
          Gross_Water_Bbls: vm.pdpWater,
          Gross_Gas_Mcf: vm.pdpGas,
          Net_Oil_Bbls: vm.pdpOilNet,
          Net_Gas_Mcf: vm.pdpGasNet,
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
          let rigs = [];
          response.forEach(rig => {
            if (rig != 'Bullpen' && rig != 'Completed') {
              rigs.push(rig);
            }
          });
          vm.rigs = rigs;
          vm.rigs.push("CREATE NEW");
        });

      waterService.getAllTc()
        .then(response => {
          vm.tcs = response;
        });
    }


  };
}());
