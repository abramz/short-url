/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */
(function () {
	'use strict';

	// Underscore.Js implementation
	// Returns a function that, as long as it continues to be
	// invoked, will not be triggered. The function will be
	// called after it stops being called for `wait` milliseconds.
	//  If `immediate` is passed, trigger the function on the leading
	//  edge of the timeout, instead of the trailing edge.
	function debounce (func, wait, immediate) {
		var timeout;
		return function () {
			var context = this;
			var args = arguments;
			var later = function () {
				timeout = null;
				if (!immediate) {
					func.apply(context, args);
				}
			};
			var callNow = immediate && !timeout;
			window.clearTimeout(timeout);
			timeout = window.setTimeout(later, wait);
			if (callNow) {
				func.apply(context, args);
			}
		};
	}

	self.debounce = debounce;
}());
