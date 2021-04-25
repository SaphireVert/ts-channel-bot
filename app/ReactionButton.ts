
export class ReactionButton {
    bot.command('inline', (ctx) => {
        return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            Markup.button.callback('CokeBoycott', 'toootooooooooooooooooooooooo'),
            Markup.button.callback('Pepsi', 'Pepsi')
          ])
        })
    })
}