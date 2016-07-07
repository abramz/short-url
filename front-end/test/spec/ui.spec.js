/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */

/* global sinon:true ShortUrlUi */
/* eslint no-unused-expressions: 0 */
(function () {
	'use strict';

	describe('Ui', function () {
		describe('#getFormData()', function () {
			it('should return url and input value', function () {
				var formId = '#form';
				var input = 'test-input';

				var stub = sinon.stub();
				var findStub = sinon.stub();
				var valSpy = sinon.spy();
				var attrSpy = sinon.spy();
				findStub.onCall(0).returns({
					val: valSpy
				});
				stub.withArgs('#form').returns({
					find: findStub,
					attr: attrSpy,
					is: function () { return true; }
				});
				var ui = new ShortUrlUi(stub);

				ui.getFormData(formId, input);
				stub.should.have.been.calledWith(formId);
				valSpy.should.have.been.called;
				attrSpy.should.have.been.called;
			});

			it('should return a message if not provided a form', function () {
				var formId = '#form';
				var input = 'test-input';

				var stub = sinon.stub();
				var findStub = sinon.stub();
				var valSpy = sinon.spy();
				var attrSpy = sinon.spy();
				findStub.onCall(0).returns({
					val: valSpy
				});
				stub.withArgs('#form').returns({
					find: findStub,
					attr: attrSpy,
					is: function () { return false; }
				});
				var ui = new ShortUrlUi(stub);

				ui.getFormData(formId, input);
				stub.should.have.been.calledWith(formId);
				valSpy.should.not.have.been.called;
				attrSpy.should.not.have.been.called;
			});
		});

		describe('#replaceText()', function () {
			it('should replace text content', function () {
				var stub = sinon.stub();
				var spy = sinon.spy();
				stub.withArgs('#replace-text').returns({
					text: spy
				});
				var ui = new ShortUrlUi(stub);
				var expected = 'i am the new text';
				ui.replaceText('#replace-text', expected);
				spy.should.have.been.calledWith(expected);
			});
		});

		describe('#replaceHref()', function () {
			it('should replace href values', function () {
				var stub = sinon.stub();
				var spy = sinon.spy();
				stub.withArgs('#replace-href').returns({
					attr: spy,
					is: function () { return true; }
				});
				var ui = new ShortUrlUi(stub);
				var expected = 'i am the new href';
				ui.replaceHref('#replace-href', expected);
				spy.should.have.been.calledWith('href', expected);
			});

			it('should return a message if element is not an a tag', function () {
				var stub = sinon.stub();
				stub.withArgs('a').returns({
					is: function () { return false; }
				});
				var ui = new ShortUrlUi(stub);
				var error = ui.replaceHref('a', 'b');
				error.should.have.property('message');
			});
		});

		describe('#showElement()', function () {
			it('should call show', function () {
				var stub = sinon.stub();
				var spy = sinon.spy();
				stub.withArgs('a').returns({
					show: spy
				});
				var ui = new ShortUrlUi(stub);
				ui.showElement('a');
				spy.should.have.been.called;
			});
		});

		describe('#hideElement()', function () {
			it('should call hide', function () {
				var stub = sinon.stub();
				var spy = sinon.spy();
				stub.withArgs('a').returns({
					hide: spy
				});
				var ui = new ShortUrlUi(stub);
				ui.hideElement('a');
				spy.should.have.been.called;
			});
		});
	});
}());
