const fs = require('fs');
const crypto = require("crypto");
const express = require('express');
const request = require('request');
const Database = require('./db.js');
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20');

'use strict';

// if db file does not exist, create it, else open it
const db = new Database(!fs.existsSync('flashcards.db')); // the argument is whether the file exists
const port = 55395;
const salt = 'next game forest nothing';

function printURL(req, res, next) {
    console.log('Serving:', req.url);
    next();
}

function isAuthenticated(req, res, next) {
    if (req.user) {
        console.log('User:', req.user.id.substring(0, 5));
        next();
    } else {
        res.redirect('/login.html');
    }
}

function gotProfile(accessToken, refreshToken, profile, done) {
	console.log('Got Google profile.');
	const hash = crypto.createHash('sha256').update(profile.id + salt).digest('hex');
	console.log('Hash:', hash);

	db.getUser(hash, id => {
		console.log(id ? `Got user: ${id}` : 'New user.');
		if (!id) db.addUser(hash);
	});

    done(null, hash);
}

function queryHandler(req, res, next) {
	const key = 'AIzaSyAOD5XGQ1XdvLWHFXnqcgG6mdimebiLM_0';
	const user = req.user.id; // user hash
	const action = req.query.action;
	
	if (action === 'getCards') {
		db.getCards(user, cards => { res.json(cards); });
	} else if (action === 'updateCard') {
		const id = req.query.id;
		const asked = req.query.asked;
		const answered = req.query.answered;
		db.uppdateCard(id, asked, answered);
	} else if (action === 'translate' || action === 'save') {
		const text = req.query.message; // text to be translated
	
		function callback(err, resHead, resBody) {
			if (err || resHead.error || resHead.statusCode != 200) throw 'API error';

			const translation = resBody.data.translations[0].translatedText;
			res.json(translation);

			if (action === 'save') db.addCard(user, text, translation);
		}

		request({
				url: `https://translation.googleapis.com/language/translate/v2?key=${key}`,
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				json: {
					source: 'en',
					target: 'sv',
					q: [text]
				}
			},
			callback
		);
	}	
}

function fileNotFound(req, res) {
	const url = req.url;
	res.type('text/plain');
	res.status(404);
	res.send(`Cannot find ${url}`);
}

passport.use(new GoogleStrategy({
		clientID: '188527312535-b738f8ejv2aorq4nskg86n0anbjunf6a.apps.googleusercontent.com',
		clientSecret: 'vImo_iJxnijW5YsogeD5ZmcK',
		callbackURL: '/auth/redirect'
	},
	gotProfile
));

passport.serializeUser((id, done) => { done(null, id); });
passport.deserializeUser((id, done) => { done(null, { id }); });

const app = express();

app.use('/', printURL);
app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000,
    keys: [salt]
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/*', express.static('public'));
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }) );
app.get('/auth/redirect',
	function (req, res, next) {
	    console.log('Redirecting: auth/redirect');
	    next();
	},
	passport.authenticate('google'),
	function (req, res) {
	    console.log('Authenticated.');
	    res.redirect('/auth/flashlingo.html');
    }
);
app.get('/auth/*', isAuthenticated, express.static('.'));
app.get('/auth/query', queryHandler);

app.use(fileNotFound);
app.listen(port, () => { console.log('Listening...'); });