'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Logo() {
	return React.createElement(
		"div",
		{ id: "loginLogo" },
		React.createElement(
			"h1",
			null,
			"Welcome to Lango"
		),
		React.createElement(
			"h2",
			null,
			"Customize your vocabulary"
		)
	);
}

function LoginButton(props) {
	return React.createElement(
		"div",
		{ id: "loginButton" },
		props.children
	);
}

var CreateLoginPage = function (_React$Component) {
	_inherits(CreateLoginPage, _React$Component);

	function CreateLoginPage(props) {
		_classCallCheck(this, CreateLoginPage);

		var _this = _possibleConstructorReturn(this, (CreateLoginPage.__proto__ || Object.getPrototypeOf(CreateLoginPage)).call(this, props));

		_this.googleLogin = _this.googleLogin.bind(_this);
		return _this;
	}

	_createClass(CreateLoginPage, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ id: "container" },
				React.createElement(
					"header",
					null,
					React.createElement(Logo, null)
				),
				React.createElement(
					"main",
					null,
					React.createElement(
						LoginButton,
						{ onclick: this.googleLogin },
						React.createElement("img", { src: "./assets/google.jpg" }),
						React.createElement(
							"p",
							null,
							"Log in with Google"
						)
					)
				)
			);
		}
	}, {
		key: "googleLogin",
		value: function googleLogin(event) {
			alert("Implement Me");
		}
	}]);

	return CreateLoginPage;
}(React.Component);

ReactDOM.render(React.createElement(CreateLoginPage, null), document.getElementsByTagName('body')[0]);