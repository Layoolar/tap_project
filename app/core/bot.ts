//import * as command from "../functions/commands";

// /**
//  * Start bot
//  * =====================
//  *
//  * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
//  *
//  * @license: MIT License
//  *
//  */
// (async () => {
//  await command.quit();
//  await command.start();
//  await command.sendPhoto();
//  await command.launch();
// })();

// import { Telegraf } from 'telegraf';
// import config from '../configs/config';

// const bot = new Telegraf(config.telegram.token);

// export default bot;

import { Telegraf } from 'telegraf';
import config from '../configs/config';
import { registerCommands } from '../functions/commands';
import { registerHears } from '../functions/hears';

const bot = new Telegraf(config.telegram.token);

(async () => {
  try {
    // Register commands and hears
    await registerCommands(bot);
    await registerHears(bot);

    // Launch the bot
    await bot.launch();
    console.log('Bot is running...');
  } catch (error) {
    console.error('Failed to launch bot:', error);
  }
})();

export default bot;
