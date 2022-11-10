const { REST, Routes } = require("discord.js");
const { clientId, token, guildId } = require("./config.json");

const rest = new REST({ version: "10" }).setToken(token);

// for guild-based commands
rest
  .delete(
    Routes.applicationGuildCommand(clientId, guildId, "1040233500021882920")
  )
  .then(() => console.log("Successfully deleted guild command"))
  .catch(console.error);

/*
// for global commands
rest
  .delete(Routes.applicationCommand(clientId, "1040209415254593596"))
  .then(() => console.log("Successfully deleted application command"))
  .catch(console.error);
*/
