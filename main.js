const Discord = require('discord.js');
const bot = new Discord.Client();
const cowsay = require("cowsay");
const axios = require('axios');
const TOKEN = process.env.TOKEN;

async function getRandomPicture(type) {
    const randomPage = Math.floor(Math.random() * 160);
    const result = await axios.get(`https://pixabay.com/api/?key=16292063-99b92de8f1d1cd9b44fa84417&q=${type}&image_type=photo&page=${randomPage}&per_page=3`);
    console.log(result);
    const randomHit = Math.floor(Math.random() * 3);
    return result.data.hits[randomHit].largeImageURL;
}

async function sendPicture(type) {
    const channel = await bot.channels.fetch('546621672497610755');
    channel.send('', {files: [await getRandomPicture(type)]});
}

bot.login(TOKEN);
bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
    /*
    setInterval(async () => {
        try {
            await sendPicture('cow');
        } catch (e) {
            console.error(e);
        }
    }, 24 * 60 * 60 * 1000);
    */
});

bot.on('message', async msg => {
    try {
        if (Math.floor(Math.random() * 5) === 0) {
            await msg.react('🐮');
        }

        let match = msg.content.match(/^cowsay (.+)/);
        if (match) {
            await msg.delete();
            const response = cowsay.say({
                text: match[1],
            });
            console.log(response);
            await msg.channel.send('```\n' + response + '```');
        }

        match = msg.content.match(/^(\w+)pic/);
        if (match) {
            await msg.delete();
            await sendPicture(match[1]);
        }
    } catch (e) {
        console.log("Critical error encountered", e);
    }
});
