(function () {
  'use strict';

  angular
    .module('compTest')
    .controller('CompTestListController', CompTestListController);

  CompTestListController.$inject = ['$scope','$state', '$window', 'CompTestService', 'Authentication', 'Notification'];

  function CompTestListController($scope, $state, $window, CompTestService, Authentication, Notification) {
    var vm = this;

//  vm.doTest = doTest;
  vm.compTest = compTest;
  vm.authentication = Authentication;
//  vm.callOauthProvider = callOauthProvider;

/*
  // Get an eventual error defined in the URL query string:
  if ($location.search().err) {
    Notification.error({ message: $location.search().err });
  }
*/
 /*
 // Save fauxPas Test
  function doTest(isValid) {
    if (!isValid) {
      $scope.$broadcast('show-errors-check-validity', 'vm.fauxPasForm');
      return false;
    }

    CompTestService.userDoTest(vm.compTest)
      .then(onUserTestSuccess)
      .catch(onUserTestError);
    }


/*    // OAuth provider request
    function callOauthProvider(url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    }

    // Authentication Callbacks

    function onUserTestSuccess(response) {
      // If successful we assign the response to the global user model
      vm.compTest = response;
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Test successful!' });
      // And redirect to the previous
      $state.go($state.previous.state.name || 'home', $state.previous.params);
    }

    function onUserTestError(response) {
      Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Test Error!', delay: 6000 });
    }
*/
  /*  // Create a new fauxPas, or update the current instance
    CompTestService.createOrUpdate(vm.compTest)
      .then(successCallback)
      .catch(errorCallback);

    function successCallback(res) {
      //If successful we assign the response to the global compTest model
      vm.compTest = res;
      // And redirect to the previous or home page
      $state.go($state.previous.state.name
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Test saved successfully!' });
    }

    function errorCallback(res) {
      Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Test save error!' });
    } */


  }
}
}());
