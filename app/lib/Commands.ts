import { Telegraf, Markup } from 'telegraf';
import { Controller } from '../controller/Controller';
import { Users } from '../controller/Users';
import { User } from '../model/User';
// import { User } from '../model/User';

export class Commands {
    bot: Telegraf;
    secrets: any;
    

    constructor(bot: Telegraf, secrets: any){
        this.bot = bot;
        this.secrets = secrets;
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

    async menu(ctx:any){
            let userFromId = ctx.update.message.chat.id;
            Users.check(userFromId);
            let isNotAdmin = Users.list[userFromId].settings.isAdmin;
            let isAdmin = Users.list[userFromId].settings.isAdmin ? false : true;
            this.inlineCallbackKeyboard(userFromId, "Welcome ! What do you wants to do ?", 
                [
                    [["Admin request", "admin_request", isNotAdmin], ["New post", "new_post", isAdmin]],
                    [["Settings", "settings", isAdmin], ["Edit posts", "totoCallback", isAdmin]]
                ]
            );  
    }

    async onText(){
        return this.bot.on('text', (ctx: any) => {
            console.log(ctx.update.message.from);
            console.log(ctx.message.text);
            var commandArray = ctx.message.text.split(" ");
            console.log(this.bot.botInfo);
            
            switch (true) {
                case new RegExp(`(^\/test)(@${this.bot.botInfo?.username})?$`).test(commandArray[0]): this.test(ctx); break;  
                case new RegExp(`(^\/menu)(@${this.bot.botInfo?.username})?$`).test(commandArray[0]): this.menu(ctx); break;
                case new RegExp(`(^\/start)(@${this.bot.botInfo?.username})?$`).test(commandArray[0]): this.start(ctx); break;
                default: break;
            }  
        })   
    }

    async onCallbackQuery(){
        return this.bot.on('callback_query', async (ctx: any) => {
            var callbackUserFrom = ctx.update.callback_query.from
            console.log(ctx.update.callback_query.data);
            var queryData:string = ctx.update.callback_query.data;
            var command = queryData.split(" ");
            switch(command[0]){
                case 'admin_request':
                    if(callbackUserFrom.id != this.secrets.BOT_OWNER_ID){
                        ctx.reply("Admin request made")
                        let message = `${callbackUserFrom.username} wants to be admin, do you accept ?`;
                        this.inlineCallbackKeyboard(this.secrets.BOT_OWNER_ID, message, [[["Yes", `setadmin ${callbackUserFrom.id} true`], ["No", `setadmin ${callbackUserFrom.id} false`]]]);
                        // return ctx.telegram.sendMessage(this.secrets.BOT_OWNER_ID, message);
                    } else {
                        return ctx.reply("You are the owner of the channel...")
                    }
                    break;

                case 'new_post':
                    // return this.newPost()
                    break;

                case "setadmin":
                    if (command[2] == 'true') {
                        Users.setPrivilegeStatus(command[1], true);
                        ctx.telegram.sendMessage(command[1], "Request accepted")
                    }
                    else
                    {
                        Users.setPrivilegeStatus(command[1], false);
                        ctx.telegram.sendMessage(command[1], "Request refused")
                    }

                    break;

                case "no":
                    Users.setPrivilegeStatus(command[1], false);
                    break
            }
            return "toto";
        })
    }

    async start(ctx:any){
            Users.check(ctx.message.from.id);
            ctx.reply('Welcome !');
    }

    async launch(){
        return this.bot.launch();
    }

    async test(ctx:any){
        ctx.reply(ctx.message.text)
    }
}