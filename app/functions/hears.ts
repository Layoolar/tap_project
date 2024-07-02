/**
//  * Telegraf Hears
//  * =====================
//  *
//  * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
//  *
//  * @license: MIT License
//  *
//  */
// import bot from "@app/functions/telegraf";

// /**
//  * hears: any taxt
//  * =====================
//  * Listen any text user write
//  *
//  */
// const text = async (): Promise<void> => {
//  bot.on("text", (ctx) => {
//      ctx.telegram.sendMessage(ctx.message.chat.id, `Your text --> ${ctx.update.message.text}`);
//  });
// };

// export { text };
// export default text;

import { Telegraf } from 'telegraf';
import { getUser, updateUser } from './databases';

export const registerHears = async (bot: Telegraf): Promise<void> => {
  bot.hears('tap', (ctx) => {
    const username = ctx.from.username || 'unknown';

    const user = getUser(username);

    if (!user) {
      ctx.reply('You need to register first using /register.');
    } else {
      updateUser(username, { coins: user.coins + 10 }); // Increase coins by 10 for each tap
      ctx.reply(`You tapped! Your new balance is ${user.coins + 10} coins.`);
    }
  });

  // Add more hears as needed
};
