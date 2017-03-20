(function() {
  'use strict';

  angular
    .module('app')
    .controller('waterDailyController', waterDailyController);

  function waterDailyController($http, $state, waterService, HomeService) {
    const vm = this;
    let system = $state.params.water;
    vm.$onInit = loadData;
    vm.pdp;
    let monthDayCount = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    vm.same = [];

    vm.orderFunction = function(well) {
      return new Date(well.Day);
    };


    function loadData() {
      waterService
      .getPdp(system)
      .then(pdp => {
        vm.pdp = pdp.map(pdp => {
          let myArr = [];
          let month = pdp._id.Date.split('/')[0];
          let days = pdp._id.Date.split('/')[1];
          let year = pdp._id.Date.split('/')[2];
          let i = days;
          while (i > 0) {

            myArr.push({
              day: HomeService.convertDate(month + '/' + i + '/' + year, 0),
              total: Math.round(pdp.total / days)
            });
            i--;
          }
          return myArr;
        });
        vm.pdp = vm.pdp.reduce((a, b) => {
          return a.concat(b);
        });
        return waterService.getWaterSystem(system);
      })
      .then(system => {
        let totals = [];
        for (var i = 0; i < system.length; i++) {
          totals.push(findValues(system[i]));
        }
        return totals;
      })
      .then(totals => {
        return Promise.all(totals).then(total => {
          let myArr = [];
          total.forEach(well => {
            for (var key in well) {
              let date = HomeService.convertDate(key, 0);
              let dateObj = {
                day: date,
                total: well[key]
              };
              var found = myArr.some(function (el) {
                return el.day === dateObj.day;
              });
              if (!found) {
                myArr.push(dateObj);
              }
              else {
                for (var i = 0; i < myArr.length; i++) {
                  if (myArr[i].day == dateObj.day) {
                    myArr[i].total += dateObj.total;
                  }
                }
              }
            }
          });
          return myArr;
        });
      })
      .then(myArr => {
        for (var j = 0; j < vm.pdp.length; j++) {
          var found = vm.same.some(function (el) {
            return el.day === vm.pdp[j].day;
          });
          if (!found) { vm.same.push({
            Day: vm.pdp[j].day,
            PDP: waterService.numberWithCommas(vm.pdp[j].total),
            New_Wells: 0,
            Total: vm.pdp[j].total
          }); }
        }
        for (var i = 0; i < myArr.length; i++) {
          for (var j = 0; j < vm.pdp.length; j++) {
            if (myArr[i].day == vm.pdp[j].day) {
              vm.same[j]['New_Wells'] = waterService.numberWithCommas(Number(vm.same[j]['New_Wells']) + myArr[i].total);
              vm.same[j]['Total'] = waterService.numberWithCommas(Number(vm.same[j]['Total']) + myArr[i].total);
            }
          }
        }
        return vm.same;
      });
      return vm.same;
    }

    function findValues(well) {
      if (!well.COMPLETION) {
        well.COMPLETION = HomeService.convertDate(well.SPUD, 60);
      }
      let total = {};
      let month = Number(well.COMPLETION.split('/')[0]);
      let day = Number(well.COMPLETION.split('/')[1]);
      let year = Number(well.COMPLETION.split('/')[2]);
      let dayCount = (monthDayCount[month] - day) + 1;
      return waterService.getTc(well.TYPE_CURVE)
        .then(tc => {
          let i = 0;
          while (i < tc.length) {
            total[`${month}/${day}/${year}`] = Math.round(tc[i].Water);
            i++
            if (day < monthDayCount[month]) {
              day++
            } else {
              day = 1;
              if (month < 12) {
                month++
              } else {
                month = 1;
                year++
              }
            }
          }
          return total;
        })
    }



  };
}());
