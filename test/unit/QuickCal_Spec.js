var expect = require('chai').expect;
var q = require('quickcal');
var translate = require('quickcal').translate;

describe('QuickCalifier', function() {
    describe('expands abbreviations', function() {
        it('today', function() {
            expect(q.expandAbbreviations('tod')).to.contain('today');
        });
        it('tomorrow', function() {
            expect(q.expandAbbreviations('tom')).to.contain('tomorrow');
        });
        it('for weekdays', function() {
            expect(q.expandAbbreviations('sun')).to.contain('sunday');
        });
    });

    it('preserves space in start text', function () {
        expect(q.parse('24 mar').start).to.equal('24 mar');
    });

    it('protects numbers in event title', function() {
        expect(q.parse('17:00 foo 1').title).to.equal('foo 1');
        expect(q.parse('24 Mar foo 1').title).to.equal('foo 1');
        expect(q.parse('24 Mar 17:00 foo 1').title).to.equal('foo 1');
    });

    describe('formats parsing result for QuickCal', function() {
        expect(q.format({start: 'foo', title: 'bar'})).to.equal('foo "bar"');
    });
});
