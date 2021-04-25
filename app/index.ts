import { Telegraf, Markup } from 'telegraf';
import { createTextChangeRange } from 'typescript';
import Secrets from './secrets.json';
const BOT_TOKEN: string = Secrets.BOT_TOKEN;
const BOT_OWNER_ID: string = Secrets.BOT_OWNER_ID;
const bot = new Telegraf(BOT_TOKEN);


// bot.inlineQuery
// const buttons = bot.Markup.inlineKeyboard([
//         [ m.callbackButton('Test', 'callback1') ],
//         [ m.callbackButton('Test 2', 'callback2') ]
//     ]));

bot.on('text', (ctx: any) => {
  var message = ctx.message.text;
  message = message + "\n\n" + 'Message suffixe'
  ctx.telegram.sendMessage(-1001464918279, message)
})



bot.on('callback_query', async (ctx: any) => {
    
    console.log(ctx.update.callback_query.data);
    console.log(ctx.update.callback_query.message.reply_markup.inline_keyboard);
    // console.log("totolog");
    // console.log(ctx.update.callback_query.message.reply_markup.inline_keyboard);
    // console.log(ctx.update.callback_query.message.reply_markup.inline_keyboard);
    
    return "toto";
})

bot.on('inline_query', async (ctx: any) => {
    
    console.log(ctx.update.callback_query.data);
    // console.log(ctx.update.callback_query.message.reply_markup.inline_keyboard);
    // console.log(ctx.update.callback_query.message.reply_markup.inline_keyboard);
    
    return "toto";
})


bot.command('custom', async (ctx) => {
    return await ctx.reply('Custom buttons keyboard', Markup
      .keyboard([
        ['🔍 Search', '😎 Popular'], // Row1 with 2 buttons
        ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
        ['📢 Ads', '⭐️ Rate us', '👥 Share'] // Row3 with 3 buttons
      ])
      .oneTime()
      .resize()
    )
})

// bot.on('text', async (ctx) => {
//   console.log(ctx.message);
//   return ctx.telegram.sendMessage(-1001445357306, "lalala")
//     // return ctx.reply(ctx.message.toString());
// })

// bot.telegram.sendMessage(1317042017, "lalala");

// bot.on('', async (ctx) => {
//   console.log(ctx.message);
//   return ctx.telegram.sendMessage(-1001445357306, "lalala")
//     // return ctx.reply(ctx.message.toString());
// })

bot.command('inline', (ctx) => {
    return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([[
          Markup.button.callback('👍', ':smiley:'),
          // Markup.button.callback('🙂', ':slightly_smiling_face:'),
          Markup.button.callback('👎', ':slightly_frowning_face:'),
        ],
        [
          Markup.button.callback('😃 🟦🟦🟦🟦🟦🟥🟥🟥🟥🟥 🙁', ':smiley:'),
        ]
      ])
    })
})


// bot.command('publish', (ctx) => {
//     return ctx.telegram.sendMessage('<b>Coke</b> or <i>Pepsi?</i>', {
//       parse_mode: 'HTML',
//       ...Markup.inlineKeyboard([
//         Markup.button.callback('😃98765', 'toootooooooooooooooooooooooo'),
//         Markup.button.callback('😭46436', 'Pepsi'),
//         Markup.button.callback('😡98865', 'Pepsi'),
//         Markup.button.callback('😨97678', 'Pepsi'),
//         // Markup.button.callback('🤮68688', 'Pepsi')
//       ])
//     })
// })

bot.command('menu', async (ctx) => {
  return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', {
    parse_mode: 'HTML', 
  })

    

        // Markup.button.callback('🤮68688', 'Pepsi')
      // ])
      // [Markup.button.callback('😃98765', 'toootoooooooooooooooooooooootest')], // Row1 with 2 buttons
      // ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
      // ['📢 Ads', '⭐️ Rate us', '👥 Share'] // Row3 with 3 buttons
    // .oneTime()
    // .resize()
})

bot.hears("/test", (ctx: any) => {
    const chatId = ctx.update.message.chat.id;
    const message = ctx.update.message.text;
    // console.log(ctx);
    ctx.sendMessage(chatId, message);
});


bot.start((ctx: any) => ctx.reply('Welcome!'));
bot.help((ctx: any) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx: any) => ctx.reply('👍'))
bot.hears('hi', (ctx: any) => ctx.reply('Hey there'))
bot.launch()