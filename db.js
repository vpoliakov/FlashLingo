const sqlite3 = require('sqlite3').verbose();

class Database extends sqlite3.Database {
	constructor(createTable = true) {
		super('flashcards.db');
		const db = this;

		if (createTable) {
			db.run('CREATE TABLE flashcards(\
					user INT,\
					text CHAR(100),\
					translation CHAR(100),\
					asked INT,\
					answered INT\
				)',
				error => { if (error) console.log('Table creation error ', error); }
			);
		}
	}

	addFlashCard(user, text, translation) {
		console.log(user, text, translation);

		try {
			// user must be an int
			if (isNaN(user) || user % 1 !== 0) throw `user (${user}) must be an int`;
	
			if (typeof text != 'string' || typeof translation != 'string') throw 'text and translation must be strings';
	
			if (text.length > 100) text = text.substring(0, 100);
	
			if (translation.length > 100) translation = translation.substring(0, 100);
	
			if (text.includes(';') || translation.includes(';')) throw 'text and translation must not include semicolons';
		} catch (error) {
			console.log(error);
			return;
		}

		this.run(`INSERT INTO flashcards VALUES(${user}, '${text}', '${translation}', 0, 0)`);
	}

	print() {
		this.all('SELECT * FROM flashcards', (err, data) => { console.log(data); });
	}
}

module.exports = Database;