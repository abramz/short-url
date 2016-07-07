/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */

/* global sinon:true debounce:true */
/* eslint no-unused-expressions: 0 */
(function () {
	'use strict';

	describe('debounce', function () {
		it('should call the function once every 1s on the leading edge', function (done) {
			var spy = sinon.spy();
			var debounced = debounce(spy, 1000, true);
			debounced();
			debounced();
			debounced();
			setTimeout(function () {
				spy.should.have.been.calledOnce;
				done();
			}, 1000);
		});

		it('should call the function once every 1s on the trailing edge', function (done) {
			var spy = sinon.spy();
			var debounced = debounce(spy, 1000);
			debounced();
			debounced();
			debounced();
			setTimeout(function () {
				spy.should.have.been.calledOnce;
				done();
			}, 1000);
		});
	});
}());
