'use strict';

// Actual Front End
function animate(element, animation) {
    element.classList.add(animation);
    setTimeout(() => {
        element.classList.remove(animation);
    }, 1000);	
}

function translate(callback, input) {
    const xhr = new XMLHttpRequest();
    const key = 'AIzaSyAOD5XGQ1XdvLWHFXnqcgG6mdimebiLM_0';
    const url = 'https://translation.googleapis.com/language/translate/v2?key=' + key;

    xhr.open("POST", url, true);
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.onload = function () {
        const translation = JSON.parse(xhr.responseText).data.translations[0].translatedText;
        callback(translation);
    }

    xhr.send(JSON.stringify({
        source: 'en',
        target: 'sv',
        q: [input]
    }));
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
                    <button id="add-view-button" onClick={self.app.addView}>Add Cards</button>
                    <p id="correct">CORRECT!</p>
                    <button id="switch-user-button" onClick={self.app.switchUser}>Switch User</button>
                </div>
                <div id="review-cards">
                    <Card><div id="prompt"></div></Card>
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

    addView = () => {
        this.setState({ view: 'add' });
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
                document.getElementById('correct').style.display = 'none';
                return card;
            }
        }
    }

    reviewView = () => {
        this.setState({ view: 'review' }, () => { this.pickCard(); });
    }

    flipCard = () => {
        const answer = document.getElementById('answer');
        const card = this.state.card;
        const correct = document.getElementById('correct');
        const prompt = document.getElementById('prompt');
        const promptCard = prompt.parentElement;
        const goodAnswer = answer.value.toLowerCase() == card.text.toLowerCase();

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
        
        setTimeout(() => {
            this.pickCard();
            answer.value = '';
        }, goodAnswer ? 1000 : 2500);
    }

    inputListener = (event) => {
        const enterPressed = event.key == 'Enter';

        if (this.state.view == 'add') {
            const text = document.getElementById('input').value; // english text
            const translation = document.getElementById('output').textContent;

            if (enterPressed && text.length) {
                this.saveCard(text, translation);
            } else {
                translate(
                    translation => {
                        document.getElementById('output').textContent = translation;
                        this.state.card = {
                            text,
                            translation,
                            asked: 0,
                            answered: 0
                        }
                    },
                    text
                );
            }
        } else if (this.state.view == 'review') {
            if (enterPressed) this.flipCard();
        }

        return false; // prevents miscellaneous default behaviors
    }

    saveCard = () => {
        this.state.cards.push(this.state.card);
    }

    switchUser = () => {
        alert('The demo does not support switching users');
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));