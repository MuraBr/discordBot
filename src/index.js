require('dotenv').config();
const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js');

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

client.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'hey') {
        interaction.reply('Hey!');
    }
    if(interaction.commandName === 'ping') {
        interaction.reply('Pong!');
    }
    if(interaction.commandName === 'meme') {
        try {
            const resposta = await axios.get('https://meme-api.com/gimme/wholesomememes');
            interaction.reply(`Resposta da API: ${resposta.data}`);
        } catch (error) {
            console.error('Erro ao fazer a solicitação à API:', error);
            interaction.reply('Ocorreu um erro ao buscar um MEME.');
        }
    }
    if(interaction.commandName === 'ms') {
        interaction.reply(`Latency is ${Math.abs(Date.now() - interaction.createdTimestamp)}ms. API Latency is ${Math.abs(Math.round(client.ws.ping))}ms`);
    }
});

client.login(process.env.CLIENT_TOKEN);
