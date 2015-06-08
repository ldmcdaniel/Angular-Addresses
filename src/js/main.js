angular
  .module('angularAddresses', ['ngRoute'])
  .config(function ($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'views/landing.html'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/people', {
        templateUrl: 'views/people.html',
        controller: 'Main',
        controllerAs: 'main'
      })
      .when('/people/:id', {
        templateUrl: 'views/person.html',
        controller: 'PersonController',
        controllerAs: 'person'


      })
      .otherwise({templateUrl: 'views/404.html'})
  })

  .filter('objToArr', function() {
    return function (obj) {
      if (obj) {
        return Object
          .keys(obj)
          .map(function (key) {
            obj[key]['_id'] = key;
            return obj[key];
          });
      }
    }
  })

  // .filter('ransomcase', function() {
  //   return function(string) {
  //     return string
  //       .split('')
  //       .map(function(char, i){
  //         return i % 2 ? char.toUpperCase() : char.toLowerCase();
  //       })
  //         .join('')
  //   }
  // })

  .controller('PersonController', function ($http, $routeParams) {
    var vm = this;
    var id = $routeParams.id;

    $http
      .get('https://angular-address-book.firebaseio.com/people/' + id + '.json')
      .success(function (data) {
        vm.data = data;
      });
  })
  .controller('Main', function($http) {
    var vm = this;

    $http
      .get('https://angular-address-book.firebaseio.com/people.json')
      .success(function(data){
        vm.people = data;
      });

  vm.newPerson = {}

  vm.addNewAddress = function() {
    $http
      .post('https://angular-address-book.firebaseio.com/people.json', vm.newPerson)
      .success(function (res) {
        vm.people[res.name] = vm.newPerson;
        //resetting the form here unlinks the input from the
        //table entry which would be unneeded on a submit to a new page
        vm.newPerson = {};
      });
  };

  vm.removeAddress = function(id) {
    console.log(id);
    $http
      .delete('https://angular-address-book.firebaseio.com/people/' + id + '.json')
      .success(function() {
        delete vm.people[id]
      });
  };
});
