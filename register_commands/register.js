require('dotenv').config()
const axios = require('axios').default;

let url = `https://discord.com/api/v8/applications/${process.env.APP_ID}/guilds/${process.env.GUILD_ID}/commands`

const headers = {
  "Authorization": `Bot ${process.env.BOT_TOKEN}`,
  "Content-Type": "application/json"
}

/*
let command_data = {
  "name": "food",
  "type": 1,
  "description": "replies with dbar ;/",
}
*/
const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('time')
	.setDescription('Replies with your input!')
	.addStringOption(option =>
		option.setName('score')
			.setDescription('in-game score'));

axios.post(url, JSON.stringify(data), {
  headers: headers,
})

