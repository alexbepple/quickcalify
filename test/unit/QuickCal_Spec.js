var expect = require('chai').expect;
var translate = require('quickcal').translate;

describe('QuickCalifier', function() {
    it('returns input unchanged when there is nothing to do', function() {
        expect(translate('foo')).to.equal('foo');
    });
});
