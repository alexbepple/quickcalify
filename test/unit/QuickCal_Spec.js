var expect = require('chai').expect;
var translate = require('quickcal').translate;

describe('QuickCalifier', function() {
    it('returns input unchanged when there is nothing to do', function() {
        expect(translate('foo')).to.equal('foo');
    });

    describe('expands abbreviations', function() {
        it('today', function() {
            expect(translate('tod')).to.contain('today');
        });
        it('tomorrow', function() {
            expect(translate('tom')).to.contain('tomorrow');
        });
        it('for weekdays', function() {
            expect(translate('sun')).to.contain('sunday');
        });
    });
});
