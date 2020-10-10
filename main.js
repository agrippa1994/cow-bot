const Discord = require('discord.js');
const bot = new Discord.Client();
const cowsay = require("cowsay");

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);
bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async msg => {
    try {
        if (Math.floor(Math.random() * 5) === 0) {
            await msg.react('🐮');
        }

        const match = msg.content.match(/^cowsay (.+)/);
        if (match) {
            await msg.delete();
            const response = cowsay.say({
                text: match[1],
            });
            console.log(response);
            await msg.channel.send('```\n' + response + '```');

        }
    } catch(e) {
        console.log("Critical error encountered", e);
    }
});
