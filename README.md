# timmy_mk_2

[AWS Lambda stuff mostly from this tutorial](https://betterprogramming.pub/build-a-discord-bot-with-aws-lambda-api-gateway-cc1cff750292)

Hitman Calc stuff is based on my [own Time Calc website](https://github.com/solderq35/time-calc-under-5), the orignal Timmy Bot by Khunee / Juliend10, and of course the research done by Hitman
community members over the past 5 years.

Deviations / Important Info:

- Must set Payload Format to 2.0. Click AWS in very top left > API Gateway > discord-API > develop > Integrations > Manage Integrations > Edit > Advanced Settings
  - To go back to code: CLick AWS in very top left > Lambda
- Two most important menus in Lambda - Code and Configuration
- [Reference Image of code setup in Lambda](https://media.discordapp.net/attachments/1018323831468851202/1040287113008128040/image.png?width=614&height=671)
  - Copy contents of `lambda_bot` folder to top directory of Lambda coding space.
- I switched to [DiscordJS](https://discordjs.guide/#before-you-begin) for handling the numberic inputs
- `.env` file isn't included here for my privacy but you will need one (Explained in the tutorial from first bullet point).
- Anything in the register_commands folder can be run via `node register.js` on your local computer. Anything in `lambda_bot` should be run inside of AWS Lambda Code terminal.
- [Deleting commands documentation](https://discordjs.guide/slash-commands/deleting-commands.html#deleting-specific-commands)
- Up to 1 million free Lambda requests (read: bot command usages) per month.
- Contact me on Discord (Solder#2337) if you want access.
