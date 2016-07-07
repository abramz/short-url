/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */
(function () {
	'use strict';

	/**
	 * API for the UI functions
	 * @type {Object}
	 */
	var ShortUrlUi = function ($) {
		/**
		 * gets the url from the form action and the value of the input w/ specified name
		 * @param  {String} element form element
		 * @param  {String} name    name of the input to get data for
		 * @return {Object}         form action as url and input value as data
		 */
		this.getFormData = function (element, name) {
			if (!$(element).is('form')) {
				return {
					message: 'Expected `element` to be a form.'
				};
			}
			// form variable so we don't do $(this) multiple times
			var $form = $(element);
			// get the data we are posting
			var attr = 'input[name="' + name + '"]';
			var data = $form.find(attr).val();
			// get the url we are posting to
			var url = $form.attr('action');

			return {
				url: url,
				data: data
			};
		};

		/**
		 * replace the text of element with newText
		 * @param  {String} element element to do replacement on
		 * @param  {String} newText value to set text to
		 */
		this.replaceText = function (element, newText) {
			// replace element's text
			$(element).text(newText);
		};

		/**
		 * replace the href of element with newHref
		 * @param  {String} element element to do replacement on
		 * @param  {String} newHref valeu to set href to
		 */
		this.replaceHref = function (element, newHref) {
			if (!$(element).is('a')) {
				return {
					message: 'Expected `element` to be an a'
				};
			}
			// replace href value
			$(element).attr('href', newHref);
		};

		/**
		 * set display:{previous display | block} on element
		 * @param  {String} element element to show
		 */
		this.showElement = function (element) {
			// show the element
			$(element).show();
		};

		/**
		 * set display:none on element
		 * @param  {String} element element to hide
		 */
		this.hideElement = function (element) {
			// hide element
			$(element).hide();
		};
	};

	self.ShortUrlUi = ShortUrlUi;
}());
