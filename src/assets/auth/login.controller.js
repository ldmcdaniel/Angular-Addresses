angular
  .module('angularAddresses')

  .controller('LoginCtrl', function ($scope, $location, Auth) {
    var vm = this;

    vm.login = function () {
      Auth.login(vm.email, vm.password, function () {
        $location.path('/people');
        $scope.$apply();
      });
    }

    vm.register = function () {};

  });
