//* Telegraf Commands
//  * =====================
//  *
//  * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
//  *
//  * @license: MIT License
//  *
//  */
// import bot from "../functions/telegraf";
// import * as databases from "../functions/databases";
// import config from "../configs/config";
// import { launchPolling, launchWebhook } from "./launcher";

// /**
//  * command: /quit
//  * =====================
//  * If user exit from bot
//  *
//  */
// const quit = async (): Promise<void> => {
//  bot.command("quit", (ctx) => {
//      ctx.telegram.leaveChat(ctx.message.chat.id);
//      ctx.leaveChat();
//  });
// };

// /**
//  * command: /photo
//  * =====================
//  * Send photo from picsum to chat
//  *
//  */
// const sendPhoto = async (): Promise<void> => {
//  bot.command("photo", (ctx) => {
//      ctx.replyWithPhoto("https://picsum.photos/200/300/");
//  });
// };

// /**
//  * command: /start
//  * =====================
//  * Send welcome message
//  *
//  */
// const start = async (): Promise<void> => {
//  bot.start((ctx) => {
//      databases.writeUser(ctx.update.message.from);

//      ctx.telegram.sendMessage(ctx.message.chat.id, `Welcome! Try send /photo command or write any text`);
//  });
// };

// /**
//  * Run bot
//  * =====================
//  * Send welcome message
//  *
//  */
// const launch = async (): Promise<void> => {
//  const mode = config.mode;
//  if (mode === "webhook") {
//      launchWebhook();
//  } else {
//      launchPolling();
//  }
// };

// export { launch, quit, sendPhoto, start };
// export default launch;

import { Telegraf } from 'telegraf';
import { addUser, getUser, updateUser } from './databases';
import { User } from '../types/databases.type';

export const registerCommands = async (bot: Telegraf): Promise<void> => {
  bot.command('start', (ctx) => {
    ctx.reply('Welcome to Tap Project! Use /register to join the game.');
  });

  bot.command('register', (ctx) => {
    const username = ctx.from.username || 'unknown';
    const language_code = ctx.from.language_code || 'unknown';

    const userExists = getUser(username);

    if (userExists) {
      ctx.reply('You are already registered.');
    } else {
      const newUser: User = {
        id: ctx.from.id,
        is_bot: ctx.from.is_bot,
        first_name: ctx.from.first_name,
        username: username,
        language_code: language_code,
        wins: 0,
        losses: 0,
        coins: 5000, // Give 5000 coins for signing up
      };
      addUser(newUser);
      ctx.reply('Registration successful! You have been awarded 5000 coins.');
    }
  });

  bot.command('status', (ctx) => {
    const username = ctx.from.username || 'unknown';

    const user = getUser(username);

    if (!user) {
      ctx.reply('You need to register first using /register.');
    } else {
      ctx.reply(`Your status: Wins - ${user.wins}, Losses - ${user.losses}, Coins - ${user.coins}`);
    }
  });

  bot.command('reward', (ctx) => {
    const username = ctx.from.username || 'unknown';

    const user = getUser(username);
    if (!user) {
      ctx.reply('You need to register first using /register.');
    } else {
      updateUser(username, { coins: user.coins + 500 });
      ctx.reply('Thank you for completing the task! You have been rewarded 500 coins.');
    }
  });
};
