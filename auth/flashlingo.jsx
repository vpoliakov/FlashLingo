'use strict';

function makeRequest(callback, url) {
    function request(command, url) {
        const xhr = new XMLHttpRequest();
        xhr.open(command, url, true);
        return xhr;
    }

    const xhr = request('GET', url);

    if (!xhr) throw 'Error, something went wrong...';
	xhr.onerror = () => { throw 'Error, something went wrong...'; };

    xhr.onload = () => {
        const data = JSON.parse(xhr.responseText);
        callback(data);
    };

    xhr.send();
}

function translate(callback, input, save) {
    const url = `query?action=${save ? 'save' : 'translate'}&message=${input}`;
    makeRequest(callback, url);
}

function getCards(callback) {
	const url = `query?action=getCards`;
    makeRequest(callback, url);
}

function updateCard(id, asked, answered) {
	const url = `query?action=updateCard&id=${id}&asked=${asked}&answered=${answered}`;
    makeRequest(() => {}, url);
}

function Card(self) {
	const className = self.className || 'card';
	return (
		<div className={className}>
			{self.children}
		</div>
	);
}

function Main(self) {
	if (self.view == 'add') {
		return (
			<main>
				<button id="review-view-button" onClick={self.app.reviewView}>Start Review</button>
				<div id="cards">
					<Card><input id="input" placeholder="English" onKeyUp={self.app.inputListener} autoFocus/></Card>
					<div id="buffer"></div>
					<Card><p id="output">Translation</p></Card>
				</div>
				<button id="save" onClick={self.app.saveCard}>Save</button>
			</main>
		);
	} else if (self.view == 'review') {
		return (
			<main>
				<div id="buttons">
					<button id="add-view-button" onClick={self.app.addView}>Add</button>
					<button id="switch-user-button" onClick={self.app.switchUser}>Switch User</button>
				</div>
				<div id="review-cards">
					<Card><div id="prompt"><p id="correct">CORRECT!</p></div></Card>
					<div id="buffer"></div>
					<Card><input id="answer" onKeyPress={self.app.inputListener} autoFocus/></Card>
				</div>
				<button id="next" onClick={self.app.flipCard}>Next</button>
			</main>
		);
	} else {
		return <main></main>;
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			card: {},
			cards: [],
			view: 'add'
		};
	}

	render = () => {
		return (
			<div id="container">
				<header>
					<h1 id="title">flashlingo!</h1>
				</header>
				<Main view={this.state.view} app={this}></Main>
				<footer>
					<p id="user">{this.state.user}</p>
				</footer>
			</div>
		);
	}

	flipCard = () => {
		const answer = document.getElementById('answer');
		const card = this.state.card;
		const prompt = document.getElementById('prompt');

		prompt.textContent = '';
		prompt.style.transform = 'rotateX(360deg)';
		prompt.style.transitionDuration = '500ms';

		if (answer.value.toLowerCase() == card.text.toLowerCase()) {
			card.answered++;
			prompt.innerHTML = '<p id="correct">CORRECT!</p></div>';
			document.getElementById('correct').style.display = 'block';
		}
		else {
			prompt.textContent = card.text;
		}

		// need to sleep here
		card.asked++;
		this.pickCard();
		updateCard(card.id, card.asked, card.answered);
		answer.value = '';
	}

	inputListener = (event) => {
		const enterPressed = event.keyCode == 13 || event.charCode == 13;

		if (this.state.view == 'add') {
			if (enterPressed) {
				this.saveCard();
			} else {
				translate(
					data => { document.getElementById('output').textContent = data; },
					document.getElementById('input').value
				);
			}
		} else if (this.state.view == 'review' && enterPressed) {
			this.flipCard();
		}

		return false;
	}

	saveCard = () => {
		translate(
			data => {
				document.getElementById('input').value = '';
				document.getElementById('output').textContent = 'Translation';
			},
			document.getElementById('input').value,
			true
		);
	}

	addView = () => {
		this.state.view = 'add';
		ReactDOM.render(<App/>, document.getElementById('app'));
	}
	
	pickCard = () => {
		const cards = this.state.cards;
		cards.map(card => { card.score = (1 - card.answered / (card.asked || 1))**2 + .1; });
		const scoresSum = cards.reduce((sum, card) => sum + card.score, 0);
		let pick = Math.random() * scoresSum;

		for (const card of cards) {
			pick -= card.score;

			if (pick <= 0) {
				this.state.card = card;
				document.getElementById('prompt').textContent = card.translation;
				return card;
			}
		}
	}

	reviewView = () => {
		this.state.view = 'review';
		ReactDOM.render(<App/>, document.getElementById('app'));
		getCards(cards => {
			this.state.cards = cards;
			this.pickCard();
		});
	}

	switchUser = () => {
		window.location.href = "/login.html";
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));