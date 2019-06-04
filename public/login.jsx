'use strict';

function Logo() {
	return (
		<div id="login-app-logo">
			<h1>flashlingo!</h1>
			<h2>Customize your vocabulary!</h2>
		</div>
	);
}

function LoginButton(props) {
	return (
		<a id="login-button" href="/auth/google">
			{props.children}
		</a>
	);
}

class CreateLoginPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="container">
				<header>
					<Logo/>
				</header>
				<main>
					<LoginButton>
					    <img src="./assets/google.jpg" />
					    <p>Log in with Google</p>
					</LoginButton>
				</main>
			</div>
		);
	}
}

ReactDOM.render(
	<CreateLoginPage />,
	document.body
);