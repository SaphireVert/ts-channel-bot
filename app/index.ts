import { Telegraf, Markup } from 'telegraf';
import { EventsCatcher } from './lib/EventsCatcher';
import secrets from './secrets.json';

const BOT_TOKEN: string = secrets.BOT_TOKEN;
const BOT_OWNER_ID: string = secrets.BOT_OWNER_ID;
const bot = new Telegraf(BOT_TOKEN);

var commands = new EventsCatcher(bot, secrets);
commands.load();

