/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */
/* global sinon:true ShortUrlHandlers $ */
/* eslint no-unused-expressions: 0 */
/* eslint new-cap: [2, {"capIsNewExceptions": ["Deferred"]}] */
(function () {
	'use strict';

	describe('Handlers', function () {
		describe('#submitHandler()', function () {
			it('should submit valid form data and call done', function () {
				sinon.stub($, 'ajax').returns($.Deferred());

				var formData = {
					data: 'x',
					url: 'y'
				};

				var getFormData = sinon.stub();
				getFormData.withArgs('#url-form', 'url').returns(formData);

				var ui = function () {
					this.getFormData = getFormData;
				};

				var handlers = new ShortUrlHandlers($, ui);
				handlers.submitHandler();

				getFormData.should.have.been.calledOnce;
				$.ajax.should.have.been.calledWith({
					type: 'POST',
					url: formData.url,
					data: { url: formData.data },
					dataType: 'json'
				});
			});
		});

		describe('#completeHandler()', function () {
			it('should call the ui', function () {
				var data = {
					url: 'the url'
				};
				var replaceTextSpy = sinon.spy();
				var replaceHrefSpy = sinon.spy();
				var showElementSpy = sinon.spy();
				var hideElementSpy = sinon.spy();
				var ui = function () {
					this.replaceText = replaceTextSpy;
					this.replaceHref = replaceHrefSpy;
					this.showElement = showElementSpy;
					this.hideElement = hideElementSpy;
				};
				var handlers = new ShortUrlHandlers(null, ui);
				handlers.completeHandler(data);
				replaceTextSpy.should.have.been.calledWith('#short-url', data.url);
				replaceHrefSpy.should.have.been.calledWith('#short-url', data.url);
				showElementSpy.should.have.been.calledWith('#short-url-container');
				hideElementSpy.should.have.been.calledWith('#error-container');
			});
		});

		describe('#errorHandler()', function () {
			it('should call the ui', function () {
				var errorJson = {
					responseJSON: { message: 'error message' }
				};
				var errorNoMessage = {};
				var replaceTextSpy = sinon.spy();
				var showElementSpy = sinon.spy();
				var hideElementSpy = sinon.spy();
				var ui = function () {
					this.replaceText = replaceTextSpy;
					this.showElement = showElementSpy;
					this.hideElement = hideElementSpy;
				};
				var handlers = new ShortUrlHandlers(null, ui);
				handlers.errorHandler(errorJson);
				replaceTextSpy.should.have.been.calledWith('#error-content', errorJson.responseJSON.message);
				showElementSpy.should.have.been.calledWith('#error-container');
				hideElementSpy.should.have.been.calledWith('#short-url-container');

				handlers.errorHandler(errorNoMessage);
				replaceTextSpy.should.have.been.calledWith('#error-content');
				showElementSpy.should.have.been.calledWith('#error-container');
				hideElementSpy.should.have.been.calledWith('#short-url-container');
			});
		});
	});
}());
