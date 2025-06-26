const tgbot = require('node-telegram-bot-api');

const token = '7533819906:AAEYRnXI062GSQnqHipGuUdGQdh2p_rFv6s';
const bot = new tgbot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
	bot.sendMessage(msg.chat.id, "Привет, октагон!");
});