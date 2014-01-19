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

    describe('supplements missing month', function() {
        var reference;
        beforeEach(function() {
            reference = Date.create('2 Jan');
        });
        it('', function() {
            expect(q.addMonthIfNecessary('3', reference)).to.equal('3 Jan');
        });
        it('giving next month if necessary', function() {
            expect(q.guessMonth('1', reference)).to.equal('Feb');
        });
        it('only if a day is given', function () {
            expect(q.containsDay('0:00')).to.be.false;
            expect(q.addMonthIfNecessary('0:00')).to.equal('0:00');
        });
        it('giving next month for today ', function() {
            expect(q.guessMonth('2', reference)).to.equal('Feb');
        });
    });
    describe('requires month to be given as three-letter abbreviation', function() {
        it('', function() {
            expect(q.containsMonth('3')).to.be.false;
            expect(q.containsMonth('feb')).to.be.true;
        });
        it(', that is case-insensitive', function() {
            expect(q.containsMonth('Feb')).to.be.true;
        });
    });

    it('protects numbers in event title', function() {
        expect(q.parse('17:00 foo 1').title).to.equal('foo 1');
        expect(q.parse('24 Mar foo 1').title).to.equal('foo 1');
        expect(q.parse('24 Mar 17:00 foo 1').title).to.equal('foo 1');
    });

    describe('formats parsing result for QuickCal', function() {
        expect(q.format({start: 'foo', title: 'bar'})).to.equal('foo "bar"');
    });


    describe('passes common use cases', function () {
        it('event for today', function() {
            q.translate('17:00 foo');
        });
    });
});
