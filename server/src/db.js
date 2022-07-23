const {Client} = require('pg');

const log = (...args) => {
	console.log('[DB]', ...args);
}

let client;

let isConnected = false;

const connect = () => {
	log('Trying to connect...');
	client = new Client({
		user: 'bandrw',
		host: 'db',
		database: 'bandrw',
		password: 'bandrw',
		port: 5432,
	});
	client.connect()
		.then(() => {
			log('Connected successfully');
			isConnected = true;
		})
		.catch((...e) => {
			log('Connection failed, reconnecting...', e);
			setTimeout(connect, 5000);
		});
};

connect();

const getGoods = async () => {
	if (!isConnected) throw new Error("Couldn't connect to database");

	const {rows} = await client.query('SELECT * FROM goods');
	return rows;
};

module.exports = {
	getGoods,
}
