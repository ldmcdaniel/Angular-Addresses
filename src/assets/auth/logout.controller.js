angular
  .module('angularAddresses')

  .controller('LogoutCtrl', function ($scope, $location, Auth) {
    Auth.logout(function () {
      $location.path('/login');
      $scope.$apply();
    });
  });
