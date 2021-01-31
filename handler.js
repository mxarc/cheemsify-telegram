const TelegramBot = require("node-telegram-bot-api");

module.exports.hello = async (event) => {
  const token = process.env.BOT_TOKEN;
  if (token === undefined) {
    throw new Error("BOT_TOKEN must be provided!");
  }
  const cheemsify = (text) => {
    return text.replace(/[aáeéiíoóuú]+[^aáeéiíoóuúmnñry]/gi, (value) => {
      const pre = value.slice(0, value.length - 1);
      const post = value[value.length - 1];
      return pre + "m" + post;
    });
  };
  const bot = new TelegramBot(token);
  const body = JSON.parse(event.body);
  const { chat, text } = body.message;
  if (text) {
    await bot.sendMessage(chat.id, cheemsify(text));
  } else {
    await bot.sendMessage(chat.id, "Tienesm que enviarm un menmsaje");
  }
  return { statusCode: 200 };
};
