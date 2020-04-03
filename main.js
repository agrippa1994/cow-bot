const Discord = require('discord.js');
const bot = new Discord.Client();
const ytdl = require("ytdl-core");

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);
bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

let audioPlayer = null;
bot.on('message', async msg => {


    try {
        await msg.react('🍆');

        if (msg.content.match(/gert/i)) {
            // msg.reply('Gstottns ma die vorlesung starten zu türfen');
            // await msg.channel.send('stottns ma die vorlesung starten zu türfen');
        }

        if(msg.content.match(/gert.*ganz leise.*/i)) {
            if(audioPlayer) {
                audioPlayer.setVolume(0.1);
            }
            return;
        }

        if(msg.content.match(/gert.*leiser.*/i)) {
            if(audioPlayer) {
                if (audioPlayer.volume == 0.0) {
                    return;
                } else {
                    audioPlayer.setVolume(audioPlayer.volume - 0.2);
                }
            }
            return;
        }

        if(msg.content.match(/gert.*lauter.*/i)) {
            if(audioPlayer) {
                if (audioPlayer.volume == 1.0) {
                    return;
                } else {
                    audioPlayer.setVolume(audioPlayer.volume + 0.2);
                }
            }
            return;
        }

        if (msg.content.match(/gert.*hdf/i) && audioPlayer) {
            audioPlayer.pause();
            return;
        }

        let match = msg.content.match(/gert.*spiel.*(http.*)/i);
        if (match) {
            const url = match[1];
            console.log(url);
            if (!msg.member.voice) return;
            const connection = await msg.member.voice.channel.join();
            audioPlayer = connection.play(ytdl(url, { filter: "audioonly" }));
            await msg.reply('Das spiele ich Ihnen');
            audioPlayer.on("finish", () => audioPlayer = null);
            return;
        }

        if (msg.content.match(/gert.*hilfe.*/i)) {
            await msg.channel.send('Gestatten Sie mir Ihnen zu helfen\nGert sag <text>\nGert hdf\nGert spiel <youtube link>\nGert lauter\nGert leiser\n');
            return;
        }
        match = msg.content.match(/gert.*sag\s(.*)/i);
        if (match && match.length >= 2) {
            console.log(match);
            await msg.delete();
            await msg.channel.send(
                match[1]
                    .replace(/d/gm, 't').replace(/D/gm, 'T')
                    .replace(/b/gm, 'p').replace(/B/gm, 'P')
                    .replace(/r/gm, 'rr').replace(/RR/gm, 'RR')
            );
            return;
        }

    } catch(e) {
        console.log("Critical error encountered", e);
    }

});