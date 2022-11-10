const { REST, Routes } = require("discord.js");
const { clientId, token } = require("./config.json");

const rest = new REST({ version: "10" }).setToken(token);

// for global commands
rest
  .delete(Routes.applicationCommand(clientId, "1040209415254593596"))
  .then(() => console.log("Successfully deleted application command"))
  .catch(console.error);
