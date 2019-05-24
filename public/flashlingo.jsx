'use strict';

function translate(callback, input, save = false) {
    function request(command, url) {
        const xhr = new XMLHttpRequest();
        xhr.open(command, url, true);
        return xhr;
    }

    const url = `query?message=${input}&save=${save}`;
    const xhr = request('GET', url);

    if (!xhr) throw 'Error, something went wrong...';

    xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        callback(data);
    };

    xhr.onerror = function () {
        throw 'Error, something went wrong...';
    };

    xhr.send();
}

function Card(props){
	return (
		<div className="card">
			{props.children}
		</div>
	);
}

class CreateCardMain extends React.Component {
	constructor(props) {
		super(props);

		this.state = { translation: null };
		this.inputListener = this.inputListener.bind(this);
		this.saveCard = this.saveCard.bind(this);
	}

	render() {
		return (
			<div id="container">
				<header>
					<h1 id="title">flashlingo!</h1>
				</header>
				<main>
					<button id="startReview">Start Review</button>
					<div id="cards">
						<Card><input id="input" placeholder="English" onKeyPress={this.inputListener}/></Card>
						<div id="buffer"></div>
                        <Card><p id="output">Translation</p></Card>
					</div>
					<button id="save" onClick={this.saveCard}>Save</button>
				</main>
				<footer>
					<p id="user">UserName</p>
				</footer>
			</div>
		);
	}

	inputListener(event) {
		if (event.charCode == 13) { // enter pressed
			translate(
				data => { document.getElementById('output').textContent = data; },
				document.getElementById('input').value
			);

			return false;
  		}
  	}

	saveCard() {
		translate(
			data => {
				document.getElementById('input').value = '';
				document.getElementById('output').textContent = 'Translation';
			},
			document.getElementById('input').value,
			true
		);
	}

	// launches the review page  
	startReview() {
		// TODO 
	}
}

ReactDOM.render(
	<CreateCardMain/>,
	document.getElementsByTagName('body')[0]
);