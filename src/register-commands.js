require("dotenv").config();
const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const guild_id = process.env.guild_id;
const client_id = process.env.client_id;
const client_token = process.env.client_token;
let deleta = false;

const rest = new REST().setToken(client_token);
const commands = [
    {
        name: "hey",
        description: "Replies with hey",
    },
    {
        name: "ping",
        description: "Replies with pong",
    },
    {
        name: "meme",
        description: "Replies with a meme",
    },
    {
        name: "ms",
        description: "Return ping in milliseconds",
    },
];

const slashRegister = async () => {
    try {
        console.log("Registering slash comments");

        await rest.put(Routes.applicationGuildCommands(client_id, guild_id), {
            body: commands,
        });
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
};
if (deleta == false) slashRegister();
if (deleta == true) {
    rest.put(Routes.applicationGuildCommands(client_id, guild_id), {
        body: [],
    })
        .then(() => console.log("Successfully deleted all guild commands."))
        .catch(console.error);

    // for global commands
    rest.put(Routes.applicationCommands(client_id), { body: [] })
        .then(() =>
            console.log("Successfully deleted all application commands."),
        )
        .catch(console.error);
}
