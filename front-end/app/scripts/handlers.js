/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */
(function () {
	'use strict';

	/**
	 * API for the handlers
	 * @type {Object}
	 */
	var ShortUrlHandlers = function ($, ShortUrlUi) {
		var ui = new ShortUrlUi($);

		/**
		 * handle ajax `done`
		 * @param  {Object} data data resolved in request
		 */
		this.completeHandler = function (data) {
			// when the promise resolves, we should have response data
			// place the url in the link text
			ui.replaceText('#short-url', data.url);
			// replace the link href with the url
			ui.replaceHref('#short-url', data.url);
			// hide the error-container
			ui.hideElement('#error-container');
			// unhide the url-container
			ui.showElement('#short-url-container');
		};

		/**
		 * handle ajax `fail`
		 * @param  {Object} error error rejected in request
		 */
		this.errorHandler = function (error) {
			// when the promise rejects, we should have an error
			// add the error text to the error content
			ui.replaceText('#error-content', error.responseJSON ? error.responseJSON.message : 'Error getting shortened URL.');
			// hide the url-container
			ui.hideElement('#short-url-container');
			// unhide the error-container
			ui.showElement('#error-container');
		};

		/**
		 * handle submit events
		 */
		this.submitHandler = function () {
			// get the form data
			var formData = ui.getFormData('#url-form', 'url');
			// post the data
			$.ajax({
				type: 'POST',
				url: formData.url,
				data: { url: formData.data },
				dataType: 'json'
			})
				.done(this.completeHandler.bind(this))
				.fail(this.errorHandler.bind(this));
		};
	};

	self.ShortUrlHandlers = ShortUrlHandlers;
}());
