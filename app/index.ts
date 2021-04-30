import { Telegraf, Markup } from 'telegraf';
import { Commands } from './lib/Commands';
import secrets from './secrets.json';

const BOT_TOKEN: string = secrets.BOT_TOKEN;
const BOT_OWNER_ID: string = secrets.BOT_OWNER_ID;
const bot = new Telegraf(BOT_TOKEN);

var commands = new Commands(bot, secrets);
commands.load();
