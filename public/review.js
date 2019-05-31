'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Card(props) {
	return React.createElement(
		"div",
		{ id: "firstCard", className: "card" },
		props.children
	);
}

function Correct(props) {
	return React.createElement(
		"div",
		{ id: "correct" },
		React.createElement(
			"p",
			null,
			"CORRECT!"
		)
	);
}

var CreateCardMain = function (_React$Component) {
	_inherits(CreateCardMain, _React$Component);

	function CreateCardMain(props) {
		_classCallCheck(this, CreateCardMain);

		var _this = _possibleConstructorReturn(this, (CreateCardMain.__proto__ || Object.getPrototypeOf(CreateCardMain)).call(this, props));

		_this.state = { translation: null };
		_this.inputListener = _this.inputListener.bind(_this);
		_this.saveCard = _this.saveCard.bind(_this);
		return _this;
	}

	_createClass(CreateCardMain, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ id: "container" },
				React.createElement(
					"header",
					null,
					React.createElement(
						"h1",
						{ id: "title" },
						"flashlingo!"
					)
				),
				React.createElement(
					"main",
					null,
					React.createElement(
						"div",
						{ id: "buttons" },
						React.createElement(
							"button",
							{ id: "startReview" },
							"Add"
						),
						React.createElement(
							"button",
							{ id: "logout" },
							"Log Out"
						)
					),
					React.createElement(
						"div",
						{ id: "cards" },
						React.createElement(
							Card,
							null,
							React.createElement(
								"div",
								{ id: "prompt" },
								React.createElement("img", { src: "./assets/arrows.png" }),
								React.createElement(
									"p",
									null,
									React.createElement(Correct, null)
								)
							)
						),
						React.createElement("div", { id: "buffer" }),
						React.createElement(
							Card,
							null,
							React.createElement("input", { id: "answer", onKeyPress: this.inputListener })
						)
					),
					React.createElement(
						"button",
						{ id: "save", onClick: this.saveCard },
						"Next"
					)
				),
				React.createElement(
					"footer",
					null,
					React.createElement(
						"p",
						{ id: "user" },
						"UserName"
					)
				)
			);
		}
	}, {
		key: "inputListener",
		value: function inputListener(event) {
			if (event.charCode == 13) {
				// enter pressed
				translate(function (data) {
					document.getElementById('output').textContent = data;
				}, document.getElementById('input').value);

				return false;
			}
		}
	}, {
		key: "saveCard",
		value: function saveCard() {
			translate(function (data) {
				document.getElementById('input').value = '';
				document.getElementById('output').textContent = 'Translation';
			}, document.getElementById('input').value, true);
		}

		// launches the review page  

	}, {
		key: "startReview",
		value: function startReview() {
			// TODO 
		}
	}]);

	return CreateCardMain;
}(React.Component);

ReactDOM.render(React.createElement(CreateCardMain, null), document.getElementsByTagName('body')[0]);