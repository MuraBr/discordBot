require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const {
      Client,
      Collection,
      Events,
      GatewayIntentBits,
      SlashCommandBuilder,
      EmbedBuilder,
} = require("discord.js");
const axios = require("axios");

const client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.on("ready", () => {
      console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      if (interaction.commandName === "hey") {
            interaction.reply("Hey!");
      }
      if (interaction.commandName === "ping") {
            interaction.reply("Pong!");
      }
      if (interaction.commandName === "meme") {
            try {
                  let resposta = await axios.get(
                        "https://meme-api.com/gimme/wholesomememes",
                  );
                  interaction.reply(`${resposta.data.postLink}`);
                  //console.log(resposta);
            } catch (error) {
                  console.error("Erro ao fazer a solicitação à API:", error);
                  interaction.reply("Ocorreu um erro ao buscar um MEME.");
            }
      }
      if (interaction.commandName === "ms") {
            interaction.reply(
                  `Latency is ${Math.abs(Date.now() - interaction.createdTimestamp)}ms. API Latency is ${Math.abs(Math.round(client.ws.ping))}ms`,
            );
      }
});
client.login(process.env.CLIENT_TOKEN);