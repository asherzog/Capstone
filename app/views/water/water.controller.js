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
    vm.tc1;
    vm.water = [];
    vm.water2 = [];
    vm.water3 = [];
    vm.total = {
    };

    function loadData() {
      waterService.getTc(1)
        .then(response => {
          vm.tc1 = response;
          vm.tc1.forEach(day => {
            vm.water.push(day.Water);
          });
        }).then(() => {
          waterService.getWaterSystem(system)
            .then(response => {
              vm.system = response.map(well => {
                if (!well.COMPLETION) {
                  well.COMPLETION = HomeService.convertDate(well.SPUD, 60);
                }
                let month = Number(well.COMPLETION.split('/')[0]);
                let day = Number(well.COMPLETION.split('/')[1]);
                let year = Number(well.COMPLETION.split('/')[2]);
                let dayCount = (monthDayCount[month] - day) + 1;
                if (well.TYPE_CURVE == "TC1-5000") {
                  let first = vm.water.slice(0, dayCount);
                  let total = first.reduce((a,b) => {
                    return a + b;
                  },0);

                  if (!vm.total[month + '/' + monthDayCount[month] + '/' + year]) {
                    vm.total[month + '/' + monthDayCount[month] + '/' + year] = Math.round(total);
                  }
                  else {
                    vm.total[month + '/' + monthDayCount[month] + '/' + year] += Math.round(total);
                  }
                  if (month < 12) {
                    month++;
                  } else {
                    month = 1;
                    year++;
                  }
                  while (dayCount < vm.water.length) {
                    let prev = dayCount;
                    dayCount += monthDayCount[month];
                    let first = vm.water.slice(prev, dayCount);
                    let total = first.reduce((a,b) => {
                      return a + b;
                    },0);
                    if (!vm.total[month + '/' + monthDayCount[month] + '/' + year]) {
                      vm.total[month + '/' + monthDayCount[month] + '/' + year] = Math.round(total);
                    }
                    else {
                      vm.total[month + '/' + monthDayCount[month] + '/' + year] += Math.round(total);
                    }
                    if (month < 12) {
                      month++;
                    } else {
                      month = 1;
                      year++;
                    }
                  }
                }

                else if (well.TYPE_CURVE == "TC1-1000") {
                  waterService.getTc(3)
                    .then(response => {
                      vm.tc3 = response;
                      vm.tc3.forEach(day => {
                        vm.water3.push(day.Water);
                      });
                    }).then(() => {
                      let first = vm.water3.slice(0, dayCount);
                      let total = first.reduce((a,b) => {
                        return a + b;
                      },0);

                      if (!vm.total[month + '/' + monthDayCount[month] + '/' + year]) {
                        vm.total[month + '/' + monthDayCount[month] + '/' + year] = Math.round(total);
                      }
                      else {
                        vm.total[month + '/' + monthDayCount[month] + '/' + year] += Math.round(total);
                      }
                      if (month < 12) {
                        month++;
                      } else {
                        month = 1;
                        year++;
                      }
                      while (dayCount < vm.water3.length) {
                        let prev = dayCount;
                        dayCount += monthDayCount[month];
                        let first = vm.water3.slice(prev, dayCount);
                        let total = first.reduce((a,b) => {
                          return a + b;
                        },0);
                        if (!vm.total[month + '/' + monthDayCount[month] + '/' + year]) {
                          vm.total[month + '/' + monthDayCount[month] + '/' + year] = Math.round(total);
                        }
                        else {
                          vm.total[month + '/' + monthDayCount[month] + '/' + year] += Math.round(total);
                        }
                        if (month < 12) {
                          month++;
                        } else {
                          month = 1;
                          year++;
                        }
                      }
                    });
                } else {
                  waterService.getTc(2)
                    .then(response => {
                      console.log(response);
                      vm.tc2 = response;
                      vm.tc2.forEach(day => {
                        vm.water2.push(day.Water);
                      });
                    }).then(() => {
                      let first = vm.water2.slice(0, dayCount);
                      console.log(first);
                      let total = first.reduce((a,b) => {
                        return a + b;
                      },0);
                      console.log(total);
                      console.log(vm.total);
                      if (!vm.total[month + '/' + monthDayCount[month] + '/' + year]) {
                        console.log(true);
                        vm.total[month + '/' + monthDayCount[month] + '/' + year] = Math.round(total);
                      }
                      else {
                        vm.total[month + '/' + monthDayCount[month] + '/' + year] += Math.round(total);
                      }
                      if (month < 12) {
                        month++;
                      } else {
                        month = 1;
                        year++;
                      }
                      while (dayCount < vm.water2.length) {
                        let prev = dayCount;
                        dayCount += monthDayCount[month];
                        let first = vm.water2.slice(prev, dayCount);
                        let total = first.reduce((a,b) => {
                          return a + b;
                        },0);
                        if (!vm.total[month + '/' + monthDayCount[month] + '/' + year]) {
                          vm.total[month + '/' + monthDayCount[month] + '/' + year] = Math.round(total);
                        }
                        else {
                          vm.total[month + '/' + monthDayCount[month] + '/' + year] += Math.round(total);
                        }
                        if (month < 12) {
                          month++;
                        } else {
                          month = 1;
                          year++;

                        }
                      }
                    });
                }


              });

              for (var key in vm.total) {
                let newKey = HomeService.convertDate(key, 0);
                vm.new.push({
                  month: newKey,
                  total : vm.total[key]
                });
              }
              waterService.getPdp(system)
                          .then(response => {
                            vm.pdp = response.map(pdp => {
                              return {
                                month: pdp._id.Date,
                                total: pdp.total
                              };
                            });
                            for (var j = 0; j < vm.pdp.length; j++) {
                              vm.same.push({
                                Month: vm.pdp[j].month,
                                PDP: numberWithCommas(vm.pdp[j].total),
                                New_Wells: null,
                                Total: numberWithCommas(vm.pdp[j].total)
                              });
                            }
                            function numberWithCommas(x) {
                              return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                            for (var i = 0; i < vm.new.length; i++) {
                              for (var j = 0; j < vm.pdp.length; j++) {
                                if (vm.new[i].month == vm.pdp[j].month) {
                                  vm.same[j]['New_Wells'] = numberWithCommas(vm.new[i].total);
                                  vm.same[j]['Total'] = numberWithCommas(vm.pdp[j].total + vm.new[i].total);
                                }
                              }
                            }
                          });
            });
        });


    }



  };
}());
