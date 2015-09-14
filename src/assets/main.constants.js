angular
  //Not using a second reference will lookup a module rather than create a new one
  .module('angularAddresses')
    //This allows us to use this as a global variable and will do the same as .value()

  .constant("API_URL", 'https://angular-address-book.firebaseio.com')
