(function () {
  'use strict';

  describe('CompTest Route Tests', function () {
    // Initialize global variables
    var $scope,
      CompTestService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _CompTestService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      CompTestService = _CompTestService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('compTest');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/compTest');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('List Route', function () {
        var liststate;
        beforeEach(inject(function ($state) {
          liststate = $state.get('compTest.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should not be abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/compTest/client/views/list-compTest.client.view.html');
        });
      });

      describe('View Route', function () {
        var viewstate,
          CompTestController,
          mockCompTest;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('compTest.view');
          $templateCache.put('/modules/compTest/client/views/view-compTest.client.view.html', '');

          // create mock compTest
          mockCompTest = new CompTestService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An compTest about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          CompTestController = $controller('CompTestController as vm', {
            $scope: $scope,
            compTestResolve: mockCompTest
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:compTestId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.compTestResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            compTestId: 1
          })).toEqual('/compTest/1');
        }));

        it('should attach a compTest to the controller scope', function () {
          expect($scope.vm.compTest._id).toBe(mockCompTest._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('/modules/compTest/client/views/view-compTest.client.view.html');
        });
      });

      describe('Handle Trailing Slash', function () {
        beforeEach(inject(function ($state, $rootScope, $templateCache) {
          $templateCache.put('/modules/compTest/client/views/list-compTest.client.view.html', '');

          $state.go('compTest.list');
          $rootScope.$digest();
        }));

        it('Should remove trailing slash', inject(function ($state, $location, $rootScope) {
          $location.path('compTest/');
          $rootScope.$digest();

          expect($location.path()).toBe('/compTest');
          expect($state.current.templateUrl).toBe('/modules/compTest/client/views/list-compTest.client.view.html');
        }));
      });
    });
  });
}());
