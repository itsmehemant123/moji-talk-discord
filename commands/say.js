const { Command } = require('discord-akairo');
var logger = require('winston');

const delay = 200;
const emojiMap = {
    "😮": ["o", "e"],
    "😐": ["b", "p", "m"],
    "🙂": ["c", "g", "j", "k", "n", "r", "s", "t", "v", "x", "z", "sh"],
    "😲": ["d", "l", "th"],
    "😯": ["q", "u", "w", "y"],
    "😀": ["a", "i"],
    "😦": []
};
const defaultEmoji = "😐";
const emojiCode = {};
const emojis = Object.keys(emojiMap);

class SayCommand extends Command {
    constructor() {
        super('say', {
            aliases: ['say'],
            ownerOnly: true
        });
    }

    exec(message) {
        var lowerCaseMsg = message.content.replace('!say', '').toLowerCase();
        logger.info('TRIGE:', lowerCaseMsg);

        message.channel.send(defaultEmoji).then(msgHandle => {
            setInterval(_ => {
                logger.info('EDITING');
                const character = lowerCaseMsg[Math.floor(new Date / delay) % (lowerCaseMsg.length + 1)];
                msgHandle.edit((Object.keys(emojiMap).find(emoji => emojiMap[emoji].includes(character)) || defaultEmoji) + '  ' + character);
            }, delay);
        }).catch(function (err) {
            logger.error('ERROR: ', err);
        });
    }
}

module.exports = SayCommand;