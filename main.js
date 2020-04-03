const Discord = require('discord.js');
const bot = new Discord.Client();
const ytdl = require("ytdl-core");

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);
bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

let dispatcher = null;

bot.on('message', async msg => {

    try {
        if (msg.content.match(/gert/i)) {
            // msg.reply('Gstottns ma die vorlesung starten zu türfen');
            // await msg.channel.send('stottns ma die vorlesung starten zu türfen');
        }

        if(msg.content.match(/gert.*leiser.*/i)) {
            if(dispatcher) {
                if (dispatcher.volume == 0.0) {
                    return;
                } else {
                    dispatcher.setVolume(dispatcher.volume - 0.2);
                }
            }
        }

        if(msg.content.match(/gert.*lauter.*/i)) {
            if(dispatcher) {
                if (dispatcher.volume == 1.0) {
                    return;
                } else {
                    dispatcher.setVolume(dispatcher.volume + 0.2);
                }
            }
        }

        if (msg.content.match(/gert.*hdf/i) && dispatcher) {
            dispatcher.pause();
        }

        const match = msg.content.match(/gert.*spiel.*(http.*)/i);
        if (match) {
            const url = match[1];
            console.log(url);
            if (!msg.member.voice) return;
            const connection = await msg.member.voice.channel.join();
            dispatcher = connection.play(ytdl(url, { filter: "audioonly" }));
            msg.reply('Das spiele ich Ihnen');
            dispatcher.on("finish", () => dispatcher = null);
        }

        await msg.react('🍆');
    } catch(e) {
        console.log("Critical error encountered", e);
    }

});