const tgbot = require('node-telegram-bot-api');
const mysql = require('mysql2');

const token = '7533819906:AAEYRnXI062GSQnqHipGuUdGQdh2p_rFv6s';
const bot = new tgbot(token, {polling: true});

const pool = mysql.createPool({
	connectionLimit: 5,
	host: "localhost",
	user: "root",
	database: "chatbottests",
	password: ""
});

bot.onText(/\/start/i, (msg) => {
	bot.sendMessage(msg.chat.id, "Привет, октагон!");
});

bot.onText(/\/help/i, (msg) => {
	bot.sendMessage(msg.chat.id, "Список команд:\n/site - отправляет в чат ссылку на сайт октагона\n/creator - отправляет в чат ФИО"
	+ "\n/randomItem - возвращает случайный предмет из БД в виде JSON"
	+ "\n/deleteItem (ID) - удаляет предмет из БД по ID и возвращает ответ"
	+ "\n/getItemById (ID) - возвращает предмет из БД по ID в виде JSON");
});

bot.onText(/\/site/i, (msg) => {
	bot.sendMessage(msg.chat.id, "https://octagon-students.ru/");
});

bot.onText(/\/creator/i, (msg) => {
	bot.sendMessage(msg.chat.id, "Гришаев Даниил Геннадьевич");
});

bot.onText(/\/randomItem/i, (msg) => {
	pool.query("SELECT * FROM items ORDER BY RAND() LIMIT 1", function (err, data) {
		if (err) return bot.sendMessage(msg.chat.id, "Возникла ошибка при вызове команды. Текст ошибки: " + err.message);
		if (!data) return bot.sendMessage(msg.chat.id, "Таблица БД пуста");
		bot.sendMessage(msg.chat.id, JSON.stringify(data));
	});
});

bot.onText(/\/deleteItem\s+(\d+)/i, (msg, match) => {
	const id = match[1];
	pool.query("DELETE FROM items WHERE id=?", [id], function (err, data) {
		if (err) return bot.sendMessage(msg.chat.id, "Возникла ошибка при вызове команды. Текст ошибки: " + err.message);
		if (data.affectedRows === 0) return bot.sendMessage(msg.chat.id, "Ошибка");
		bot.sendMessage(msg.chat.id, "Удачно");
	});
});

bot.onText(/\/getItemByID\s+(\d+)/i, (msg, match) => {
	const id = match[1];
	pool.query("SELECT * FROM items WHERE id=?", [id], function (err, data) {
		if (err) return bot.sendMessage(msg.chat.id, "Возникла ошибка при вызове команды. Текст ошибки: " + err.message);
		if (!data) return bot.sendMessage(msg.chat.id, "Таблица БД пуста");
		bot.sendMessage(msg.chat.id, JSON.stringify(data));
	});
});

process.on('SIGINT', async () => {
	console.log("disconnecting");
	process.exit(0);
});
