import { Telegraf, Markup } from 'telegraf';
import { Controller } from '../controller/Controller';
import { Users } from '../controller/Users';
import { User } from '../model/User';
var fs = require('fs');

// import { User } from '../model/User';

export class EventsCatcher {
    bot: Telegraf;
    secrets: any;
    suffix: string;

    constructor(bot: Telegraf, secrets: any){
        this.bot = bot;
        this.secrets = secrets;
        this.suffix = fs.readFileSync('./data/suffixe.txt');
    }

    async load(){
        this.onCallbackQuery();
        this.onText();
        this.launch();
        return true;
    }

    async inlineCallbackKeyboard(chat_id: string, inline_message: string, keyboard: Array<any>){
        let inlineKeyboard: Array<any> = [];
        for (let i = 0; i < keyboard.length; i++) {
            inlineKeyboard[i] = [];
            for (let j = 0; j < keyboard[i].length; j++) {
                inlineKeyboard[i][j] = [];
                inlineKeyboard[i][j] = Markup.button.callback(keyboard[i][j][0], keyboard[i][j][1], keyboard[i][j][2]);
            }
        }
        const test = [[{ text: '👍', callback_data: ':smiley:', hide: false }]];
        return this.bot.telegram.sendMessage(chat_id, inline_message, {
            parse_mode: 'HTML',
            ...Markup.inlineKeyboard(inlineKeyboard)
        })
    }

    async menu(userFromId:any){
            Users.check(userFromId);
            let ifNotAdmin = Users.list[userFromId].settings.isAdmin;
            let ifAdmin = Users.list[userFromId].settings.isAdmin ? false : true;
            // let message = Users.list[userFromId].settings.isAdmin ? "What would you want to do ?" : "You have to be admin to start using this bot"
            let message = Users.list[userFromId].settings.isAdmin ? "What would you want to do ?" : "You have to be admin to start using this bot"

            if(!Users.list[userFromId].settings.isAdmin){

            } else {
                return this.bot.telegram.sendMessage(userFromId, message, Markup
                    .keyboard([
                      ['📢 New post'], // Row1 with 2 buttons
                      ['⚙️ Setting'], // Row2 with 2 buttons
                    ])
                    .oneTime()
                    .resize())
            }

            // this.inlineCallbackKeyboard(userFromId, message,
            //     [
            //         [["Admin request", "admin_request", ifNotAdmin], ["New post", "new_post", ifAdmin]],
            //         [["Settings", "settings", ifAdmin], ["Edit posts", "totoCallback", true]]
            //     ]
            // );



    }

    async onText(){
        return this.bot.on('text', async (ctx: any) => {
            console.log(ctx.message);
            Users.check(ctx.chat.id);
            if (!Users.list[ctx.chat.id].settings.isAdmin) {
                // await ctx.reply("You have to be admin to start using this bot");
                return this.inlineCallbackKeyboard(ctx.chat.id, "You have to be admin to start using this bot",
                    [
                        [["Admin request", "admin_request"]]
                    ]
                );
            }
            if (Users.list[ctx.chat.id].isPending == true) {
                Users.list[ctx.chat.id].isPending = false;
                await ctx.reply("Here is the preview of your message.");
                this.inlineCallbackKeyboard(ctx.chat.id, ctx.message.text + "\n\n\n" + this.suffix,
                    [
                        [[`Publish`, `publish ${this.bot.botInfo?.username}`]],
                        [["Validation sample", "validation"]]
                    ]
                );
            }
            var commandArray = ctx.message.text.split(" ");
            switch (true) {
                case new RegExp(`(^\/test)(@${this.bot.botInfo?.username})?$`).test(commandArray[0]): this.test(ctx); break;
                case new RegExp(`(^\/menu)(@${this.bot.botInfo?.username})?$`).test(commandArray[0]): this.menu(ctx.chat.id); break;
                case new RegExp(`(^\/start)(@${this.bot.botInfo?.username})?$`).test(commandArray[0]): this.start(ctx); break;
                case new RegExp('📢 New post').test(ctx.message.text): this.newPost(ctx); break;
                default: break;
            }
        })
    }

    async onCallbackQuery(){
        return this.bot.on('callback_query', async (ctx: any) => {
            console.log(ctx.update.callback_query.message.chat);
            console.log(ctx.update.callback_query.data);
            var callbackUserFrom = ctx.update.callback_query.message.chat
            var queryData:string = ctx.update.callback_query.data;
            var command = queryData.split(" ");
            switch(command[0]){
                case 'admin_request':
                    if(callbackUserFrom.id != this.secrets.BOT_OWNER_ID){
                        let ctxMarkup = ctx.update.callback_query.message.reply_markup;
                        ctxMarkup.inline_keyboard[0][0] = { text: "Request sent", callback_data: "none" };
                        this.bot.telegram.editMessageReplyMarkup(ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id, undefined, ctxMarkup)
                        let message = `${callbackUserFrom.username} wants to be admin, do you accept ?`;
                        this.inlineCallbackKeyboard(this.secrets.BOT_OWNER_ID, message, [[["Yes", `setadmin ${callbackUserFrom.id} true`], ["No", `setadmin ${callbackUserFrom.id} false`]]]);
                    } else {
                        return ctx.reply("You are the owner of the channel...")
                    }
                    break;

                case 'new_post':
                    break;

                case "setadmin":
                    let ctxMarkup = ctx.update.callback_query.message.reply_markup;
                    ctxMarkup.inline_keyboard[0] = [{ text: "Accepted", callback_data: "none" }];
                    if (command[2] == 'true') {
                        Users.setPrivilegeStatus(command[1], true);
                        await ctx.telegram.sendMessage(command[1], "Request accepted")
                        await ctx.telegram.sendMessage(command[1], "Welcome to the club !")
                        this.menu(command[1]);
                        this.bot.telegram.editMessageReplyMarkup(ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id, undefined, ctxMarkup)
                    }
                    else
                    {
                        Users.setPrivilegeStatus(command[1], false);
                        ctx.telegram.sendMessage(command[1], "Request refused")
                    }

                    break;

                case "no":
                    Users.setPrivilegeStatus(command[1], false);
                    break;

                case "publish":
                    let ctxMarkupPublish = ctx.update.callback_query.message.reply_markup;
                    ctxMarkupPublish.inline_keyboard[0] = [{ text: "Published", callback_data: "none" }];
                    this.bot.telegram.sendMessage(this.secrets.channelID, ctx.update.callback_query.message.text);
                    this.bot.telegram.editMessageReplyMarkup(ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id, undefined, ctxMarkupPublish);
                    break;

                case "validation":
                    let ctxMarkupValidation = ctx.update.callback_query.message.reply_markup;
                    ctxMarkupValidation.inline_keyboard[1] = [{ text: "Validation sent", callback_data: "none" }];
                    this.inlineCallbackKeyboard(this.secrets.validation_group, ctx.update.callback_query.message.text, [[["👍", `upvote`], ["👎", `downvote`]]]);
                    this.bot.telegram.editMessageReplyMarkup(ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id, undefined, ctxMarkupValidation);
                    break;
                
                case "upvote":
                    break;
                
                case "downvote":
                    break;
            }
            return "toto";
        })
    }

    async newPost(ctx:any){
        Users.list[ctx.chat.id].isPending = true;
        ctx.reply("Ok, tell me what you would like to post.")
    }

    async start(ctx:any){
        Users.check(ctx.chat.id);
        ctx.reply('Welcome ! Type /menu to begin');
    }

    async launch(){
        return this.bot.launch();
    }

    async test(ctx:any){
        ctx.reply(ctx.message.text)
    }
}
