(function() {
  'use strict';

  angular
    .module('app')
    .controller('waterController', waterController);

  function waterController($http, $state, waterService, HomeService) {
    const vm = this;
    let system = $state.params.water;
    vm.$onInit = loadData;
    let monthDayCount = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    vm.pdp;
    vm.new = [];
    vm.same = [];
    vm.tc;
    vm.water;
    vm.total = [];

    function loadData() {
      waterService
        .getPdp(system)
        .then(pdp => {
          vm.pdp = pdp.map(pdp => {
            return {
              month: pdp._id.Date,
              total: pdp.total
            };
          });
          return waterService.getWaterSystem(system);
        })
        .then((waterSystem) => {
          let totals = [];
          for (var i = 0; i < waterSystem.length; i++) {
            totals.push(updateWater(waterSystem[i]));
          }
          return totals;
        })
        .then((totals) => {
          return Promise.all(totals).then(total => {
            let myArr = [];
            total.forEach(well => {
              for (var key in well) {
                let newKey = HomeService.convertDate(key, 0);
                let newMonth = {
                  month: newKey,
                  total : well[key]
                };
                var found = myArr.some(function (el) {
                  return el.month === newMonth.month;
                });
                if (!found) {
                  myArr.push(newMonth);
                }
                else {
                  for (var i = 0; i < myArr.length; i++) {
                    if (myArr[i].month == newMonth.month) {
                      myArr[i].total += newMonth.total;
                    }
                  }
                }
              }
            });
            return myArr;
          });
        })
        .then((myArr) => {
          for (var j = 0; j < vm.pdp.length; j++) {
            var found = vm.same.some(function (el) {
              return el.month === vm.pdp[j].month;
            });
            if (!found) { vm.same.push({
              Month: vm.pdp[j].month,
              PDP: waterService.numberWithCommas(vm.pdp[j].total),
              New_Wells: 0,
              Total: vm.pdp[j].total
            }); }
          }
          for (var i = 0; i < myArr.length; i++) {
            for (var j = 0; j < vm.pdp.length; j++) {
              if (myArr[i].month == vm.pdp[j].month) {
                vm.same[j]['New_Wells'] = waterService.numberWithCommas(Number(vm.same[j]['New_Wells']) + myArr[i].total);
                vm.same[j]['Total'] = waterService.numberWithCommas(Number(vm.same[j]['Total']) + myArr[i].total);
              }
            }
          }
          return vm.same;
        });
      return vm.same;
    }


    function updateWater(well) {
      let totals = {};
      if (!well.COMPLETION) {
        well.COMPLETION = HomeService.convertDate(well.SPUD, 60);
      }
      let month = Number(well.COMPLETION.split('/')[0]);
      let day = Number(well.COMPLETION.split('/')[1]);
      let year = Number(well.COMPLETION.split('/')[2]);
      let dayCount = (monthDayCount[month] - day) + 1;
      return waterService.getTc(well.TYPE_CURVE)
        .then(response => {
          let tc = response;
          let first = tc.slice(0, dayCount);
          let total = first.reduce((a,b) => {
            return a + b.Water;
          },0);
          if (!totals[month + '/' + monthDayCount[month] + '/' + year]) {
            totals[month + '/' + monthDayCount[month] + '/' + year] = Math.round(total);
          }
          else {
            totals[month + '/' + monthDayCount[month] + '/' + year] += Math.round(total);
          }
          if (month < 12) {
            month++;
          } else {
            month = 1;
            year++;
          }
          while (dayCount < tc.length) {
            let prev = dayCount;
            dayCount += monthDayCount[month];
            let first = tc.slice(prev, dayCount);
            let total = first.reduce((a,b) => {
              return a + b.Water;
            },0);
            if (!totals[month + '/' + monthDayCount[month] + '/' + year]) {
              totals[month + '/' + monthDayCount[month] + '/' + year] = Math.round(total);
            }
            else {
              totals[month + '/' + monthDayCount[month] + '/' + year] += Math.round(total);
            }
            if (month < 12) {
              month++;
            } else {
              month = 1;
              year++;
            }
          }
          return totals;
        });
    }

  };
}());
