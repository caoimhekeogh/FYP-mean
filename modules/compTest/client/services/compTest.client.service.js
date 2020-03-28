(function () {
  'use strict';

  angular
    .module('compTest.services')
    .factory('CompTestService', CompTestService)

  CompTestService.$inject = ['$resource', '$log'];

/*  function CompTestService($resource) {
    var CompTest = $resource('/api/compTest', {} , {
      update: {
        method: 'PUT',
      },
      doTest: {
        method: 'POST',
        url: '/fauxPas'
      }
    }); */
    function CompTestService($resource, $log) {
      var CompTest = $resource('/api/compTest/:compTestId', {
        compTestId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });

    angular.extend(CompTest.prototype, {
     createOrUpdate: function () {
        var compTest = this;
        return createOrUpdate(compTest);
      }
  /*     successCallback: function (compTest) {
        return this.save(compTest).$promise;
      },
      errorCallback: function (compTest) {
        return this.save(compTest).$promise;
      },
      userDoTest: function (compTest) {
      return this.doTest(compTest).$promise;
      } */
    });

    return CompTest;

   function createOrUpdate(compTest) {
      if (compTest._id) {
        return compTest.$update(onSuccess, onError);
      } else {
        return compTest.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(compTest) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }

/*
  // TODO this should be Users service
  angular
    .module('compTest.admin.services')
    .factory('AdminService', AdminService);

  AdminService.$inject = ['$resource'];

  function AdminService($resource) {
    return $resource('/api/:compTestId', {
      compTestId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  } */
}());
