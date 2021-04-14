import { Telegraf, Markup } from 'telegraf';
import { createTextChangeRange } from 'typescript';
import Secrets from './secrets.json';
const BOT_TOKEN: string = Secrets.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx: any) => ctx.reply('Welcome!'));
bot.help((ctx: any) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx: any) => ctx.reply('👍'))
bot.hears('hi', (ctx: any) => ctx.reply('Hey there'))
bot.launch()