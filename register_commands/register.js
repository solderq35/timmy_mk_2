require('dotenv').config()
const axios = require('axios').default;

let url = `https://discord.com/api/v8/applications/${process.env.APP_ID}/guilds/${process.env.GUILD_ID}/commands`

const headers = {
  "Authorization": `Bot ${process.env.BOT_TOKEN}`,
  "Content-Type": "application/json"
}
const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('time')
	.setDescription('Returns a millisecond time value')
	.addStringOption(option =>
		option.setName('score')
			.setDescription('Score on Rating Screen'));

axios.post(url, JSON.stringify(data), {
  headers: headers,
})

