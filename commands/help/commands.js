/**
 * @file commands command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  let categories = Bastion.commands.map(c => c.config.module.toLowerCase()).unique();

  if (!args.category) {
    return await message.channel.send({
      embed: {
        color: Bastion.colors.GOLD,
        title: 'List of Command Categories',
        description: `Use the \`${this.help.name} <category>\` command to list all the commands in the specified category.\nTo get a complete list of all the commands with details, visit [my website](https://bastionbot.org/) and check out the commands section: https://bastionbot.org/commands.`,
        fields: [
          {
            name: 'Command Categories',
            value: categories.map(m => m.replace(/_/g, ' ').toTitleCase()).join('\n')
          }
        ],
        footer: {
          text: `Did you know? There are ${Bastion.commands.size} commands in this version of Bastion!`
        }
      }
    });
  }

  args.category = args.category.join('_').toLowerCase();
  if (!categories.includes(args.category)) {
    return await message.channel.send({
      embed: {
        color: Bastion.colors.RED,
        title: 'Cateogry de commande introuvable',
        description: 'Utilisez la commande `commands` sans aucun argument pour obtenir une liste de toutes les catégories de commandes disponibles.'
      }
    });
  }

  let commands = Bastion.commands.filter(c => c.config.module === args.category);
  args.category = args.category.replace(/_/g, ' ').toTitleCase();

  await message.channel.send({
    embed: {
      color: Bastion.colors.GOLD,
      title: `List of Commands in ${args.category} category`,
      description: `Use the \`commands\` command to get a list of all the ${categories.length} command categories.`,
      fields: [
        {
          name: `${commands.size} ${args.category} Commands`,
          value: `\`\`\`css\n${commands.map(c => c.help.name).join('\n')}\`\`\``
        },
        {
          name: 'Besoin de plus de détails?',
          value: 'Check out the help message of the command, using the `help <command>` command.'
        },
        {
          name: 'Tu veux la liste complète ?',
          value: 'Pour obtenir une liste complète de toutes les commandes avec des détails, visite [mon site](https://bastionbot.org/) et consultez la page des commandes: https://bastionbot.org/commands.'
        }
      ],
      footer: {
        text: `Il y a actuelement ${Bastion.commands.size} commandes dans cette version du bot!`
      }
    }
  });
};

exports.config = {
  aliases: [ 'cmds' ],
  enabled: true,
  argsDefinitions: [
    { name: 'category', type: String, multiple: true, defaultOption: true }
  ]
};

exports.help = {
  name: 'commands',
  description: 'Shows the list of command categories. And if a category is specified, Bastion will show a list of commands in that category.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'commands [category]',
  example: [ 'commands', 'commands game stats', 'commands moderation' ]
};
