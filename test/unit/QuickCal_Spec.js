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

    it('preserves dd mmm', function () {
        expect(translate('24 mar foo')).to.contain('24 mar');
    });

    it('protects numbers in event name', function() {
        expect(translate('17:00 GFGFR 1/2014')).to.contain('"GFGFR 1/2014"');
        expect(translate('24 Mar GFGFR 1/2014')).to.contain('"GFGFR 1/2014"');
        expect(translate('24 Mar 17:00 GFGFR 1/2014')).to.contain('"GFGFR 1/2014"');
    });
});
