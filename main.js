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
        // await msg.react('🍆');

        if (msg.content.match(/gert/i)) {
            // msg.reply('Gstottns ma die vorlesung starten zu türfen');
            // await msg.channel.send('stottns ma die vorlesung starten zu türfen');
        }

        if(msg.content.match(/gert.*ganz leise.*/i)) {
            if(audioPlayer) {
                audioPlayer.setVolume(0.05);
            }
            return;
        }

        if(msg.content.match(/gert.*ganz laut.*/i)) {
            if(audioPlayer) {
                audioPlayer.setVolume(1.0);
            }
            return;
        }

        if(msg.content.match(/gert.*leiser.*/i)) {
            if(audioPlayer) {
                const newVolume = audioPlayer.volume - 0.1;
                audioPlayer.setVolume(newVolume <= 0.0 ? 0.1 : newVolume);
            }
            return;
        }

        let match = msg.content.match(/gert.*ton.*?(\d+)/i);
        if(match) {
            if (match.length <= 1) {
                await msg.reply("Tas ist falsch. Wie laut?");
                return;
            }

            const volume = parseInt(match[1]);
            console.log(match);
            if (volume < 0 || volume > 100) {
                await msg.reply("Tie Zahl muss zwischen 0 und 100 liegen");
                return;
            }

            if(audioPlayer) {
                console.log("new volume:", volume);
                audioPlayer.setVolume(volume / 100);
                await msg.reply("Tie Lautstärke wirt auf " + volume + " gesetzt");
            }
            return;
        }

        if (msg.content.match(/gert.*hdf/i) && audioPlayer) {
            audioPlayer.pause();
            return;
        }

        match = msg.content.match(/gert.*spiel.*(http.*)/i);
        if (match) {
            const url = match[1];
            console.log(url);
            if (!msg.member.voice) return;
            const connection = await msg.member.voice.channel.join();
            const stream = url.indexOf("youtu") !== -1 ? ytdl(url, { filter: "audioonly" }) : url;
            audioPlayer = connection.play(stream, { volume: 0.15 });
            await msg.reply('Das spiele ich Ihnen');
            audioPlayer.on("finish", () => audioPlayer = null);
            return;
        }

        if (msg.content.match(/gert.*hilfe.*/i)) {
            await msg.channel.send('Gestatten Sie mir Ihnen zu helfen\nGert sag <text>\nGert hdf\nGert spiel <youtube link>\nGert lauter\nGert leiser\nGert ganz laut\nGert ganz leise\nGert ton <0-100>');
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
                    .replace(/r/gm, 'rr').replace(/R/gm, 'RR')
            );
            return;
        }

    } catch(e) {
        console.log("Critical error encountered", e);
    }

});