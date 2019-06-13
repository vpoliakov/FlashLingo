'use strict';

// Actual Front End

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function animate(element, animation) {
    element.classList.add(animation);
    setTimeout(function () {
        element.classList.remove(animation);
    }, 1000);
}

function translate(callback, input) {
    var xhr = new XMLHttpRequest();
    var key = 'AIzaSyAOD5XGQ1XdvLWHFXnqcgG6mdimebiLM_0';
    var url = 'https://translation.googleapis.com/language/translate/v2?key=' + key;

    xhr.open("POST", url, true);
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.onload = function () {
        var translation = JSON.parse(xhr.responseText).data.translations[0].translatedText;
        callback(translation);
    };

    xhr.send(JSON.stringify({
        source: 'en',
        target: 'sv',
        q: [input]
    }));
}

function Card(self) {
    var className = self.className || 'card';
    return React.createElement(
        'div',
        { className: className },
        self.children
    );
}

function Main(self) {
    if (self.view == 'add') {
        return React.createElement(
            'main',
            null,
            React.createElement(
                'button',
                { id: 'review-view-button', onClick: self.app.reviewView },
                'Start Review'
            ),
            React.createElement(
                'div',
                { id: 'cards' },
                React.createElement(
                    Card,
                    null,
                    React.createElement('input', { id: 'input', placeholder: 'English', onKeyUp: self.app.inputListener, autoFocus: true })
                ),
                React.createElement('div', { id: 'buffer' }),
                React.createElement(
                    Card,
                    null,
                    React.createElement(
                        'p',
                        { id: 'output' },
                        'Translation'
                    )
                )
            ),
            React.createElement(
                'button',
                { id: 'save', onClick: self.app.saveCard },
                'Save'
            )
        );
    } else if (self.view == 'review') {
        return React.createElement(
            'main',
            null,
            React.createElement(
                'div',
                { id: 'buttons' },
                React.createElement(
                    'button',
                    { id: 'add-view-button', onClick: self.app.addView },
                    'Add Cards'
                ),
                React.createElement(
                    'p',
                    { id: 'correct' },
                    'CORRECT!'
                ),
                React.createElement(
                    'button',
                    { id: 'switch-user-button', onClick: self.app.switchUser },
                    'Switch User'
                )
            ),
            React.createElement(
                'div',
                { id: 'review-cards' },
                React.createElement(
                    Card,
                    null,
                    React.createElement('div', { id: 'prompt' })
                ),
                React.createElement('div', { id: 'buffer' }),
                React.createElement(
                    Card,
                    null,
                    React.createElement('input', { id: 'answer', onKeyPress: self.app.inputListener, autoFocus: true })
                )
            ),
            React.createElement(
                'button',
                { id: 'next', onClick: self.app.flipCard },
                'Next'
            )
        );
    } else {
        return React.createElement('main', null);
    }
}

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.render = function () {
            return React.createElement(
                'div',
                { id: 'container' },
                React.createElement(
                    'header',
                    null,
                    React.createElement(
                        'h1',
                        { id: 'title' },
                        'flashlingo!'
                    )
                ),
                React.createElement(Main, { view: _this.state.view, app: _this }),
                React.createElement(
                    'footer',
                    null,
                    React.createElement(
                        'p',
                        { id: 'user' },
                        _this.state.user
                    )
                )
            );
        };

        _this.addView = function () {
            _this.setState({ view: 'add' });
        };

        _this.pickCard = function () {
            var cards = _this.state.cards;
            cards.map(function (card) {
                card.score = Math.pow(1 - card.answered / (card.asked || 1), 2) + .1;
            });
            var scoresSum = cards.reduce(function (sum, card) {
                return sum + card.score;
            }, 0);
            var pick = Math.random() * scoresSum;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = cards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var card = _step.value;

                    pick -= card.score;

                    if (pick <= 0) {
                        _this.state.card = card;
                        document.getElementById('prompt').textContent = card.translation;
                        document.getElementById('correct').style.display = 'none';
                        return card;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        };

        _this.reviewView = function () {
            _this.setState({ view: 'review' }, () => { _this.pickCard(); });
        };

        _this.flipCard = function () {
            var answer = document.getElementById('answer');
            var card = _this.state.card;
            var correct = document.getElementById('correct');
            var prompt = document.getElementById('prompt');
            var promptCard = prompt.parentElement;
            var goodAnswer = answer.value.toLowerCase() == card.text.toLowerCase();

            if (goodAnswer) {
                card.answered++;
                correct.style.display = 'unset';
            } else {
                animate(promptCard, 'start-flip');
                prompt.textContent = card.text;
                animate(promptCard, 'end-flip');
            }

            card.asked++;
            updateCard(card.id, card.asked, card.answered);

            setTimeout(function () {
                _this.pickCard();
                answer.value = '';
            }, goodAnswer ? 1000 : 2500);
        };

        _this.inputListener = function (event) {
            var enterPressed = event.key == 'Enter';

            if (_this.state.view == 'add') {
                var text = document.getElementById('input').value; // english text
                var translation = document.getElementById('output').textContent;

                if (enterPressed && text.length) {
                    _this.saveCard(text, translation);
                } else {
                    translate(function (translation) {
                        document.getElementById('output').textContent = translation;
                        _this.state.card = {
                            text: text,
                            translation: translation,
                            asked: 0,
                            answered: 0
                        };
                    }, text);
                }
            } else if (_this.state.view == 'review') {
                if (enterPressed) _this.flipCard();
            }

            return false; // prevents miscellaneous default behaviors
        };

        _this.saveCard = function () {
            _this.state.cards.push(_this.state.card);
            document.getElementById('input').value = '';
            document.getElementById('output').textContent = 'Translation';
        };

        _this.switchUser = function () {
            alert('The demo does not support switching users');
        };

        _this.state = {
            card: {},
            cards: [],
            view: 'add'
        };
        return _this;
    }

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));