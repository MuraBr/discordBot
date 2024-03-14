require('dotenv').config(); //initializes dotenv
const axios = require('axios'); //add this line at the top
const { Client, GatewayIntentBits } = require('discord.js'); //imports discord.js

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ],
});

let server = client.guilds.cache.get('<guild id>');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

async function getMeme() {
    const res = await axios.get('https://memeapi.pythonanywhere.com/');
    return res.data.memes[0].url;
}

client.on('message', async msg => {
    switch (msg.content) {
        case "ping":
            msg.reply("Pong!");
            break;
        //starting meme command
        case "!meme":
            msg.channel.send("Here's your meme!"); //the reply to the user command
            const img = await getMeme(); //fetches the URL from the API
            msg.channel.send(img); //sends the image URL to Discord
            break;
    }
});

client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'hey') {
        interaction.reply('Hey!');
    }
    if(interaction.commandName === 'ping') {
        interaction.reply('Pong!');
    }
    if(interaction.commandName === 'meme') {
        try {
            const resposta = await axios.get('https://memeapi.pythonanywhere.com/');
            interaction.reply(`Resposta da API: ${resposta.data}`);
        } catch (error) {
            console.error('Erro ao fazer a solicitação à API:', error);
            interaction.reply('Ocorreu um erro ao buscar um MEME.');
        }
    }
    if(interaction.commandName === 'ms') {
        interaction.reply(`Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
});

client.login(process.env.CLIENT_TOKEN);
