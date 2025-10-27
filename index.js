const TelegramBot = require('node-telegram-bot-api');
const ytdl = require('ytdl-core');

const token = '8211789886:AAE6AKOCOCpHoprJA-PJXbMZwNMriwpCFik';
const bot = new TelegramBot(token, {polling: true});

console.log('✅ البوت يعمل!');

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '🎥 مرحباً! أرسل رابط يوتيوب وسأظهر لك الجودات المتاحة');
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (ytdl.validateURL(text)) {
    try {
      const info = await ytdl.getInfo(text);
      const title = info.videoDetails.title;
      
      let response = `🎬 ${title}\n\nالجودات المتاحة:\n`;
      
      const formats = ytdl.filterFormats(info.formats, 'videoandaudio');
      formats.forEach((format) => {
        if (format.qualityLabel) {
          response += `📹 ${format.qualityLabel}\n`;
        }
      });

      bot.sendMessage(chatId, response);
      
    } catch (error) {
      bot.sendMessage(chatId, '❌ حدث خطأ');
    }
  }
});
