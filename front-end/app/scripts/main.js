/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */
(function () {
	'use strict';

	var handlers = new self.ShortUrlHandlers(self.$, self.ShortUrlUi);

	// debounce the submit handler so it doesn't get called a bunch
	// in case the user presses enter or clicks submit a bunch
	var submitHandler = self.debounce(handlers.submitHandler, 5000, true);

	// attach the debounced submitHandler to the url-form
	self.$('#url-form').submit(function (event) {
		// stop the form from submitting normally
		event.preventDefault();
		submitHandler.call(handlers);
	});
}());
