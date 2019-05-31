'use strict';

function Card(props) {
	return (
		<div id="firstCard" className="card">
			{props.children}
		</div>
	);
}

function Correct(props) {
	return(
		<div id="correct">
			<p>CORRECT!</p>
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
					<div id="buttons">
						<button id="startReview">Add</button>
						<button id="logout">Log Out</button>
					</div>
					<div id="cards">
                        <Card>
                        	<div id="prompt">
                        		<img src="./assets/arrows.png" />
                        		<p><Correct /></p>
                        	</div>
                        </Card>
                    	<div id="buffer"></div>
						<Card><input id="answer" onKeyPress={this.inputListener}/></Card>
					</div>
					<button id="save" onClick={this.saveCard}>Next</button>
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