# Timmy MK 2

Timmy MK 2 is an homage to the original Timmy the Time Bot programmed by Khunee and Juliend10 in Python. I switched to Javascript as I'm more comfortable with it, and AWS hosting for a more stable hosting solution than the original Timmy bot.

For a full deep dive into the math behind this, please check [Time Calc Website README](https://github.com/solderq35/time-calc-under-5/blob/main/README.md#mathematics-code-explanation). This bot mostly works the same, except that this bot can return up to 4 possible values, in return for the user typing in less inputs than the Time Calc Website. I kept it that way as the original Timmy Bot did it the same, and also because the speedrunner users are generally ok with sifting through a few possible answers if they can enter less inputs.

## Important Technical Info for Lambda / DiscordJS:

- [AWS Lambda stuff mostly from this tutorial](https://betterprogramming.pub/build-a-discord-bot-with-aws-lambda-api-gateway-cc1cff750292)
- Must set Payload Format to 2.0. Click AWS in very top left > API Gateway > discord-API > develop > Integrations > Manage Integrations > Edit > Advanced Settings
  - To go back to code: CLick AWS in very top left > Lambda
- Anything in the `register_commands` folder can be run via `node register.js` on your local computer. Anything in `lambda_bot` should be run inside of AWS Lambda Code terminal.
  - Two most important menus in Lambda - Code and Configuration (for Env. Variables)
  - [Reference Image of code setup in Lambda](https://media.discordapp.net/attachments/1018323831468851202/1040287113008128040/image.png?width=614&height=671)
  - Copy contents of `lambda_bot` folder to top directory of Lambda coding space.
- I switched to [DiscordJS](https://discordjs.guide/#before-you-begin) instead of Axios for handling the numberic inputs
- `.env` and `config.json` files aren't included here for my privacy but you will need one (Explained in the tutorial from first bullet point), as well as [here](https://discordjs.guide/creating-your-bot/#using-config-json)

- [Deleting commands documentation](https://discordjs.guide/slash-commands/deleting-commands.html#deleting-specific-commands)
  - [Right click here for command ID](https://media.discordapp.net/attachments/1018323831468851202/1040345092185137232/image.png)
- Up to 1 million free Lambda requests (read: bot command usages) per month.
- **Contact me on Discord (Solder#2337) if you want access.**
