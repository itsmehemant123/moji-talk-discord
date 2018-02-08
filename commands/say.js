const { Command } = require('discord-akairo');
var logger = require('winston');

const delay = 500;
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
        const start = Date.now();

        message.channel.send(defaultEmoji).then(msgHandle => {
            const intervalHandle = setInterval(_ => {
                const index = Math.floor((Date.now() - start) / delay) % (lowerCaseMsg.length + 1);
                if (index == lowerCaseMsg.length - 1) {
                    clearInterval(intervalHandle);
                }
                const currentEmoji = this.resolveCharacter(index, lowerCaseMsg) || defaultEmoji;
                const words = lowerCaseMsg.substr(0, index).split(' ');

                msgHandle.edit(currentEmoji);
            }, delay);
        }).catch(function (err) {
            logger.error('ERROR: ', err);
        });
    }

    resolveCharacter(index, message) {
        const character = message[index];
        const previousDouble = message.substr(index - 1, index + 1);
        const nextDouble = message.substr(index, index + 2);
        return emojis.find(e => emojiMap[e].indexOf(previousDouble) !== -1) || emojis.find(e => emojiMap[e].indexOf(nextDouble) !== -1) || emojis.find(e => emojiMap[e].indexOf(character) !== -1);
    }
}

module.exports = SayCommand;