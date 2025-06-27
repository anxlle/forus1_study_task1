const tgbot = require('node-telegram-bot-api');

const token = '7533819906:AAEYRnXI062GSQnqHipGuUdGQdh2p_rFv6s';
const bot = new tgbot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
	bot.sendMessage(msg.chat.id, "Привет, октагон!");
});

bot.on('message', (msg) => {
	var help = "/help", site = "/site", creator = "/creator";
	
	if (msg.text.toString().toLowerCase().indexOf(help) === 0)
		bot.sendMessage(msg.chat.id, "Список команд:\n/site - отправляет в чат ссылку на сайт октагона\n/creator - отправляет в чат ФИО");
		
	if (msg.text.toString().toLowerCase().indexOf(site) === 0)
		bot.sendMessage(msg.chat.id, "https://octagon-students.ru/");

	if (msg.text.toString().toLowerCase().indexOf(creator) === 0)
		bot.sendMessage(msg.chat.id, "Гришаев Даниил Геннадьевич");
});