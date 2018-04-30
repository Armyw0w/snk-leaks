"use strict";
exports.__esModule = true;
function startCrawler(bot, message) {
    if (bot.Crawler.itStarted()) {
        message.reply('The crawler it\'s already running.');
        return;
    }
    message.reply('Started the crawler.');
    bot.ChannelID = message.channel.id;
    bot.Crawler.Start();
}
exports.startCrawler = startCrawler;
