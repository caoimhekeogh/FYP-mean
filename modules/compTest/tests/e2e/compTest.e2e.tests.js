'use strict';

describe('CompTest E2E Tests:', function () {
  describe('Test compTest page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/compTest');
      expect(element.all(by.repeater('compTest in compTest')).count()).toEqual(0);
    });
  });
});
