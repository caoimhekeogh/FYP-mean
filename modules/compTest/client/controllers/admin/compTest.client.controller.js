(function () {
  'use strict';

  angular
    .module('compTest.admin')
    .controller('CompTestAdminController', CompTestAdminController);

  CompTestAdminController.$inject = ['$scope', '$state', '$window', 'compTestResolve', 'Authentication', 'Notification'];

  function CompTestAdminController($scope, $state, $window, compTest, Authentication, Notification) {
    var vm = this;

    vm.compTest = compTest;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Competency Test
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.compTest.$remove(function () {
          $state.go('admin.compTest.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Test deleted successfully!' });
        });
      }
    }

    // Save Competency Test
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.fauxPasForm');
        return false;
      }

      // Create a new compTest, or update the current instance
      vm.compTest.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.compTest.list'); // should we send the User to the list or the updated compTest's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Test saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Test save error!' });
      }
    }
  }
}());
