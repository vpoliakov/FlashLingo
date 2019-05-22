'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Card(props) {
    return React.createElement(
        "div",
        { className: "textCard" },
        props.children
    );
}

function Txt(props) {
    if (props.phrase == undefined) {
        return React.createElement(
            "p",
            { id: "noText" },
            "Translation"
        );
    } else return React.createElement(
        "p",
        null,
        props.phrase
    );
}

var CreateCardMain = function (_React$Component) {
    _inherits(CreateCardMain, _React$Component);

    function CreateCardMain(props) {
        _classCallCheck(this, CreateCardMain);

        var _this = _possibleConstructorReturn(this, (CreateCardMain.__proto__ || Object.getPrototypeOf(CreateCardMain)).call(this, props));

        _this.state = { translation: null };

        _this.checkReturn = _this.checkReturn.bind(_this);
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
                        "div",
                        { id: "startReview" },
                        React.createElement(
                            "button",
                            null,
                            "Start Review"
                        )
                    ),
                    React.createElement(
                        "h1",
                        null,
                        "Lango!"
                    )
                ),
                React.createElement(
                    "main",
                    null,
                    React.createElement(
                        "div",
                        { id: "cards" },
                        React.createElement(
                            Card,
                            null,
                            React.createElement("textarea", { id: "inputEng", placeholder: "English", onKeyPress: this.checkReturn })
                        ),
                        React.createElement(
                            Card,
                            null,
                            React.createElement(Txt, { phrase: this.state.translation })
                        )
                    ),
                    React.createElement(
                        "div",
                        { id: "save" },
                        React.createElement(
                            "button",
                            { onClick: this.saveCard },
                            "Save"
                        )
                    )
                ),
                React.createElement(
                    "footer",
                    null,
                    React.createElement(
                        "p",
                        null,
                        " UserName "
                    )
                )
            );
        } // end of render function 

        // onKeyPress function for the textarea element
        // When the charCode is 13, the user has hit the return key

    }, {
        key: "checkReturn",
        value: function checkReturn(event) {
            if (event.charCode == 13) {
                var newPhrase = document.getElementById('inputEng').value;
                this.setState({ translation: newPhrase });
            }
        }

        // saves a phrase entered by the user into the database

    }, {
        key: "saveCard",
        value: function saveCard() {
            // TO DO
            alert('Implement Me!!!');
        }

        // launches the review page  

    }, {
        key: "startReview",
        value: function startReview() {
            // TO DO 
        }
    }]);

    return CreateCardMain;
}(React.Component); // end of class

ReactDOM.render(React.createElement(CreateCardMain, null), document.getElementById('root'));