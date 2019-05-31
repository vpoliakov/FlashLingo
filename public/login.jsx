'use strict';

function Logo() {
	return (
		<div id="loginLogo">
			<h1>Welcome to Lango</h1>
			<h2>Customize your vocabulary</h2>
		</div>
	);
}

function LoginButton(props) {
	return (
		<div id="loginButton">
			{props.children}
		</div>
	);
}

class CreateLoginPage extends React.Component {
	constructor(props) {
		super(props);

		this.googleLogin = this.googleLogin.bind(this);
	}

	render() {
		return (
			<div id="container">
				<header>
					<Logo />
				</header>
				<main>
					<LoginButton onclick={this.googleLogin}>
					    <img src="./assets/google.jpg" />
					    <p>Log in with Google</p>
					</LoginButton>
				</main>
			</div>
		);
	}

	googleLogin(event) {
		alert("Implement Me");
  	}
}

ReactDOM.render(
	<CreateLoginPage />,
	document.getElementsByTagName('body')[0]
);