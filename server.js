const express = require('express');
const request = require('request');
const Database = require('./db.js');

'use strict';

const port = 55395;

function queryHandler(req, res, next) {
	const key = 'AIzaSyAOD5XGQ1XdvLWHFXnqcgG6mdimebiLM_0';
	const text = req.query.message; // text to be translated
	
	function callback(err, resHead, resBody) {
		if (err || resHead.error || resHead.statusCode != 200) throw 'API error';

		const translation = resBody.data.translations[0].translatedText;
		res.json(translation);
		db.addFlashCard(0, text, translation);
	}

	request(
		{
			url: `https://translation.googleapis.com/language/translate/v2?key=${key}`,
			method: 'POST',
			headers: {'content-type': 'application/json'},
			json: {
				source: 'en',
				target: 'ru',
				q: [text]
			}
		},
		callback
	);
}

function fileNotFound(req, res) {
	const url = req.url;
	res.type('text/plain');
	res.status(404);
	res.send(`Cannot find ${url}`);
}

const db = new Database();
const app = express()
app.use(express.static('public'));
app.get('/query', queryHandler );
app.use(fileNotFound);
app.listen(port, function (){ console.log('Listening...'); });
