const tgbot = require('node-telegram-bot-api');

const token = '7533819906:AAEYRnXI062GSQnqHipGuUdGQdh2p_rFv6s';
const bot = new tgbot(token, {polling: true});

bot.onText(/\/start/i, (msg) => {
	bot.sendMessage(msg.chat.id, "Привет, октагон!");
});

bot.onText(/\/help/i, (msg) => {
	bot.sendMessage(msg.chat.id, "Список команд:\n/site - отправляет в чат ссылку на сайт октагона\n/creator - отправляет в чат ФИО");
});

bot.onText(/\/site/i, (msg) => {
	bot.sendMessage(msg.chat.id, "https://octagon-students.ru/");
});

bot.onText(/\/creator/i, (msg) => {
	bot.sendMessage(msg.chat.id, "Гришаев Даниил Геннадьевич");
});
