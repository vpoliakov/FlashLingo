const sqlite3 = require('sqlite3').verbose();

// A class implementing a database for flashcards
class Database extends sqlite3.Database {
    constructor(createTables = true) {
        super('flashcards.db');
        const db = this;

        if (createTables) { // run when initializing the db
            db.run(
                'CREATE TABLE flashcards(\
                    id INTEGER PRIMARY KEY,\
                    user INT,\
                    text CHAR(100),\
                    translation CHAR(100),\
                    asked INT,\
                    answered INT\
                )',
                error => { if (error) console.log('Table creation error ', error); }
            );

            db.run(
                'CREATE TABLE users(\
                    id INT PRIMARY KEY,\
                    hash CHAR(64)\
                )',
                error => { if (error) console.log('Table creation error ', error); }
            );
        }
    }

    addUser(hash) {
        if (hash.length != 64 || hash.includes(';')) throw 'invalid hash';

        const db = this;
        db.all(
            'SELECT * FROM users',
            (err, data) => {
                const id = data.length + 1 || 1;
                db.run(
                    'INSERT INTO users VALUES(?, ?)',
                    [id, hash]
                );
            }
        );
    }
    
    getUser(hash, callback) {
        if (hash.length != 64 || hash.includes(';')) throw 'invalid hash';

        const db = this;
        db.get(
            'SELECT id FROM users WHERE hash = ?',
            [hash],
            (err, data) => { callback(data && data.id ? data.id : undefined); }
        );
    }

    addCard(hash, text, translation, asked = 0, answered = 0) {
        const db = this;

        db.getUser(hash, user => {
            try { // validate and format input
                if (isNaN(user) || user % 1 !== 0) throw `user (${user}) must be an int`;	
                if (typeof text != 'string' || typeof translation != 'string') throw 'text and translation must be strings';
                if (text.length > 100) text = text.substring(0, 100);
                if (translation.length > 100) translation = translation.substring(0, 100);
                if (text.includes(';') || translation.includes(';')) throw 'text and translation must not include semicolons';
            } catch (error) {
                console.log(error);
                return;
            }

            db.run(
                'INSERT INTO flashcards (user, text, translation, asked, answered) VALUES(?, ?, ?, ?, ?)',
                [user, text, translation, asked, answered],
                () => { console.log('Adding: ', user, text, translation); }
            );
        });
    }

    updateCard(id, asked, answered) {
        const db = this;

        db.get(
            'SELECT * FROM flashcards WHERE id = ?',
            [id],
            (err, card) => {
                if (!card || !card.id) throw 'could not update the card';
                db.run(
                    'REPLACE INTO flashcards VALUES(?, ?, ?, ?, ?, ?)',
                    [card.id, card.user, card.text, card.translation, asked, answered]
                );
            }
        );
    }

    getCards(hash, callback) {
        if (hash.length != 64 || hash.includes(';')) throw 'invalid hash';

        const db = this;
        db.getUser(hash, user => {
            db.all(
                'SELECT id, text, translation, asked, answered FROM flashcards WHERE user = ?',
                [user],
                (err, cards) => { callback(cards); }
            );
        });
    }
}

module.exports = Database;