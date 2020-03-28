(function () {
  'use strict';

  angular
    .module('compTest')
    .controller('FacialRecogTestController', FacialRecogTestController);

  FacialRecogTestController.$inject = ['$scope','$state', '$window', 'facialRecogTestResolve', 'Authentication', 'Notification'];

  function FacialRecogTestController($scope, '$state', '$window', facialRecogTest, Authentication, Notification) {
    var vm = this;
/*
    $scope.checkboxModel = {
     detQFPSS1yes: true,
     detQFPSS1no : true,
     detQFPSS1dk : true
   };
*/    vm.form = {};
  //  vm.remove = remove;
    vm.save = save;
    vm.facialRecogTest = facialRecogTest;
    vm.authentication = Authentication;

   // Save fauxPas Test
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.facialRecogForm');
        return false;
      }

      // Create a new fauxPas, or update the current instance
      FacialRecogTestService.createOrUpdate(vm.facialRecogTest)
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        //If successful we assign the response to the global compTest model
        vm.facialRecogTest = res;
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
