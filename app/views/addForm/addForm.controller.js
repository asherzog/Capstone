(function() {
  'use strict';

  angular
    .module('app')
    .controller('addFormController', addFormController);

  function addFormController($http, $state, waterService, HomeService, Upload, $window) {
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
        let data = response.data;
        vm.formData = data.data;
        // $http.get('http://localhost:3000/testing')
        //   .then(response => {
        //     console.log(response.data);
        //   })
        if (data.type == "Type Curve") {
          console.log(vm.formData);
        }
      });
    }

    vm.confirmDetails = function() {
      console.log(vm.formData);
    }


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
