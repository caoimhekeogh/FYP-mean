(function () {
  'use strict';

  angular
    .module('compTest')
    .controller('TomTestController', TomTestController);

  TomTestController.$inject = ['$scope','$state', '$window', 'tomTestResolve', 'Authentication', 'Notification'];

  function TomTestController($scope, '$state', '$window', tomTest, Authentication, Notification) {
    var vm = this;


    vm.save = save;
    vm.tomTest = tomTest;
    vm.authentication = Authentication;

   // Save tom Test
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.tomForm');
        return false;
      }

      // Create a new tom, or update the current instance
      TomTestService.createOrUpdate(vm.tomTest)
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        //If successful we assign the response to the global compTest model
        vm.tomTest = res;
        // And redirect to the previous or home page
        $state.go($state.previous.state.name
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Test saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Test save error!' });
      }
    }
  }
}());
