import { Telegraf, Markup } from 'telegraf';
import { Controller } from '../controller/Controller';
import { UserController } from '../controller/UserController';
// import { User } from '../model/User';

export class Commands {
    bot: Telegraf;
    secrets: any;
    

    constructor(bot: Telegraf, secrets: any){
        this.bot = bot;
        this.secrets = secrets;
    }

    async load(){
        console.log(Markup.button.callback('Admin request', 'admin_request'));

        this.menu();
        this.onCallbackQuery();
        this.mainMenu();
        this.inlineCommand();
        this.start();
        this.launch();
        this.onText();
        return true;
    }


    async test(){

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


    
    async menu(){
        return this.bot.command('/menu', (ctx: any) => {
            let userFromId = ctx.update.message.chat.id;
            this.inlineCallbackKeyboard(userFromId, "Welcome ! What do you wants to do ?", 
                [
                    [["Admin request", "admin_request"], ["New post", "new_post"]],
                    [["Settings", "settings"], ["Edit posts", "totoCallback"]]
                ]
            );  
        })
    }

    async onText(){
        console.log(await this.bot.telegram.getChatMember(976140946, 976140946));
        console.log(await this.bot.telegram.getChatMembersCount(976140946));
        // var test = new dataModel();
        // test.createUser("976140946");
        return this.bot.on('text', (ctx: any) => {
            console.log(ctx.update.message.from);
            
        })
          
    }

    async newPost(message: string){
        return this.bot.telegram.sendMessage(this.secrets.BOT_OWNER_ID, message + "\n\nRejoignez-nous")
    }

    async onCallbackQuery(){
        return this.bot.on('callback_query', async (ctx: any) => {
            var callbackUserFrom = ctx.update.callback_query.from
            console.log(ctx.update.callback_query.data);
            // console.log(ctx.update.callback_query.message.reply_markup.inline_keyboard);
            // console.log(ctx.update.callback_query.message);
            var queryData:string = ctx.update.callback_query.data;
            var command = queryData.split(" ");
            switch(command[0]){
                case 'admin_request':
                    if(callbackUserFrom.id != this.secrets.BOT_OWNER_ID){
                        ctx.reply("Admin request made")
                        let message = `${callbackUserFrom.username} wants to be admin, do you accept ?`;
                        this.inlineCallbackKeyboard(this.secrets.BOT_OWNER_ID, message, [[["Yes", `setadmin ${callbackUserFrom.id}`], ["No", "no"]]]);
                        // return ctx.telegram.sendMessage(this.secrets.BOT_OWNER_ID, message);
                    } else {
                        return ctx.reply("You are the owner of the channel...")
                    }
                    break;

                case 'new_post':
                    // return this.newPost()
                    break;

                case "setadmin":
                    Controller.userController.addUser(command[1]);
                    Controller.userController.userList[command[1]].settings.isAdmin = true;
                    Controller.userController.saveUsers();
                    ctx.telegram.sendMessage(command[1], "Request accepted")
                    break;
            }
            return "toto";
        })
    }

    async mainMenu(){
        return this.bot.command('custom', async (ctx) => {
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
    }
    async inlineCommand(){
        return this.bot.command('inline', (ctx) => {
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
    }

    async start(){
        return this.bot.start((ctx: any) => ctx.reply('Welcome !'));
    }
    async launch(){
        return this.bot.launch();
    }

}