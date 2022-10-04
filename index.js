const telegramApi = require('node-telegram-bot-api')

const token = '5609873071:AAEsJ7x3qI8eRQzfQNQmpMas6_rFtY78LHg';

const bot = new telegramApi(token, {polling: true})

const chats = {}

const {gameOptions, againOptions} = require('./options.js')

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю цифру, а ты должен ее угадать')
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = String(randomNumber);
            console.log(chats)
            await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

bot.setMyCommands([
    {command: '/start', description: 'Начально привествие'},
    {command: '/info', description: 'Получить информацию'},
    {command: '/game', description: 'Игра угадай цифру'}
])


const start = () => {
    bot.on('message',async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://selcdn.tlgrm.app/stickers/a6f/1ae/a6f1ae15-7c57-3212-8269-f1a0231ad8c2/192/8.webp')
            return bot.sendMessage(chatId, `Добро пожаловать в мой первый телеграм бот:)`);
        }
        if (text ==='/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
        }
        if (text ==='/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, `Я тебя не понимаю, пробуй еще раз!`)
    })
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        console.log(data)
        if (data === '/again') {
            return startGame(chatId);
        }
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `поздарвляем! ты отгадал цифру ${chats[chatId]}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `К сожалению ты не угадал, бот загдал цифру ${chats[chatId]}`, againOptions)
        }
    })
    
}

start()