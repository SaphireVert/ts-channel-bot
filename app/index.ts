import { Telegraf, Markup } from 'telegraf';
import { Controller } from './controller/Controller';
import { Users } from './controller/Users';
import { Commands } from './lib/Commands';
// import { User } from './model/User';
// import { createTextChangeRange } from 'typescript';
import secrets from './secrets.json';

const BOT_TOKEN: string = secrets.BOT_TOKEN;
const BOT_OWNER_ID: string = secrets.BOT_OWNER_ID;
const bot = new Telegraf(BOT_TOKEN);

var commands = new Commands(bot, secrets);
// console.log("hello world");

// Users.list[1317042017].settings.isAdmin = false;
// Users.save();
// Users.test();
console.log("------");

// Users.list[1317042017].settings.isAdmin = true;
// Users.save();
// Users.setPrivilegeStatus("1317042017", true);
// Users.addUser("1317042017");

// console.log(bot.);

// bot.hears(new RegExp(`(^\/latest)`), async (ctx) => {
//     let props = ctx.update.message.text.split(" ");
//     let count = parseInt(props[1]);
//     ctx.reply("toto");
// });
commands.load();
