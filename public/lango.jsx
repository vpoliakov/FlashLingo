'use strict';

function Card(props) {
    return 
        <div className="textCard">
            {props.children}
    	</div>
}
	

function Txt(props) {
	if (props.phrase == undefined) {
    	return <p id="noText">Translation</p>;
	}
	else { 
    	return <p>{props.phrase}</p>;
    }
}


class CreateCardMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = { translation: null };
        this.checkReturn = this.checkReturn.bind(this);
        this.saveCard = this.saveCard.bind(this);
    }

    render() {
        return (
            <div id="container">
                <header>
                    <div id="startReview">
                    	<button>Start Review</button>
                    </div>
                    <h1>Lango!</h1>
                </header>
                <main>
                    <div id="cards">
                        <Card>
           	                <textarea id="inputEng" placeholder="English" onKeyPress={this.checkReturn} />
                        </Card>
                        <Card>
           	                <Txt phrase={this.state.translation} /> 
                        </Card>
                    </div>
                    <div id="save">
                        <button onClick={this.saveCard}>Save</button>
                    </div>
                </main>
                <footer>
                    <p> UserName </p>
                </footer>
            </div>
        );
    } // end of render function 

    // onKeyPress function for the textarea element
    // When the charCode is 13, the user has hit the return key
    checkReturn(event) {
        if (event.charCode == 13) {
            const newPhrase = document.getElementById('inputEng').value;
            this.setState({ translation: newPhrase });
  	    }
  	}

    // saves a phrase entered by the user into the database
    saveCard() {
        // TO DO
        alert('Implement Me!!!');
    }

    // launches the review page  
    startReview() {
        // TO DO 
    }
} // end of class

ReactDOM.render(
    <CreateCardMain />,
    document.getElementById('root')
);


	 