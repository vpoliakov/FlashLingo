// Prints contents of flashcards.db

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('flashcards.db');
db.all('SELECT * FROM flashcards', (err, data) => { console.log(data); });