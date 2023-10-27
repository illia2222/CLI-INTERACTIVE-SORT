import { program } from 'commander';
import TelegramBot from "node-telegram-bot-api";

const TOKEN = '6799103242:AAHkPqzkKRz7aH5EPxJFmBvpzOTaYuTnfFs';
const CHAT_ID = '397943046';

program
    .name('cli-telegram-bot')
    .description('CLI to send smth to Telegram')
    .version('0.0.1');
program
    .command('send-message <message>')
    .alias('m')
    .description('Send a message to your Telegram bot')
    .action((message) => sendMessage(message, CHAT_ID));
program
    .command('send-photo <path>')
    .alias('p')
    .description('Send a photo to the Telegram bot')
    .action((path) => sendPhoto(path, CHAT_ID));

program.parse();

async function useBot(func) {
    const bot = new TelegramBot(TOKEN, {
        polling: true
    });
    try {
        await func(bot);
    } finally {
        await bot.stopPolling();
    }
}

async function sendMessage(message, chatId) {
    await useBot((bot => bot.sendMessage(chatId, message)));
}

async function sendPhoto(path, chatId) {
    await useBot((bot => bot.sendPhoto(chatId, path)));
}