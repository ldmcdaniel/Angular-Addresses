angular
  .module('angularAddresses')

  .factory('Auth', function ($rootScope, API_URL) {
    var fb = new Firebase(API_URL);

    return {
      logout(cb) {
        fb.unauth(function () {
          $rootScope.auth = null;
        });
      },

      login (email, password, cb) {
        fb.authWithPassword({
          email: email,
          password: password
        }, function (err, authData) {
          if (err) {
            console.log('Error', err)
          } else {
            $rootScope.auth = authData;
          }
        });
      }
    }
  });
