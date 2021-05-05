import secretsDev from './secrets-dev.json'
import secretsProd from './secrets.json'

var secrets;
if (process.argv[2] == "--dev") {
    secrets = secretsDev;
} else {
    secrets = secretsProd;
}

import { Telegraf, Markup } from 'telegraf';
import { EventsCatcher } from './lib/EventsCatcher';

const BOT_TOKEN: string = secrets.BOT_TOKEN;
const BOT_OWNER_ID: string = secrets.BOT_OWNER_ID;
const bot = new Telegraf(BOT_TOKEN);

var commands = new EventsCatcher(bot, secrets);
commands.load();
