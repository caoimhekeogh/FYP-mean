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
          mainstate = $state.get('admin.compTest');
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
          liststate = $state.get('admin.compTest.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should be not abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/compTest/client/views/admin/list-compTest.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          CompTestAdminController,
          mockCompTest;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('admin.compTest.create');
          $templateCache.put('/modules/compTest/client/views/admin/form-compTest.client.view.html', '');

          // Create mock compTest
          mockCompTest = new CompTestService();

          // Initialize Controller
          CompTestAdminController = $controller('CompTestAdminController as vm', {
            $scope: $scope,
            compTestResolve: mockCompTest
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.compTestResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/admin/compTest/create');
        }));

        it('should attach an compTest to the controller scope', function () {
          expect($scope.vm.compTest._id).toBe(mockCompTest._id);
          expect($scope.vm.compTest._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('/modules/compTest/client/views/admin/form-compTest.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          CompTestAdminController,
          mockCompTest;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('admin.compTest.edit');
          $templateCache.put('/modules/compTest/client/views/admin/form-compTest.client.view.html', '');

          // Create mock compTest
          mockCompTest = new CompTestService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An CompTest about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          CompTestAdminController = $controller('CompTestAdminController as vm', {
            $scope: $scope,
            compTestResolve: mockCompTest
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:compTestId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.compTestResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            compTestId: 1
          })).toEqual('/admin/compTest/1/edit');
        }));

        it('should attach an compTest to the controller scope', function () {
          expect($scope.vm.compTest._id).toBe(mockCompTest._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('/modules/compTest/client/views/admin/form-compTest.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
