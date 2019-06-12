const fs = require('fs');
const crypto = require("crypto");
const express = require('express');
const request = require('request');
const Database = require('./db.js');
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20');

'use strict';

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