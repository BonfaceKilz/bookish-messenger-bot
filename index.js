'use strict';
const BootBot = require('bootbot');
const bot = new BootBot({
  accessToken: config.get('accessToken'),
  verifyToken: config.get('verifyToken'),
  appSecret: config.get('appSecret')
});

const Client = require('node-rest-client').Client;
bot.on('message', (payload, chat) => {
  const text = payload.message.text;
  //chat.say(`My text: ${text}`);
});

bot.hear(['hello', 'hi', 'sema', /hey( there)?/i], (payload, chat) => {
  // Send a text message followed by another text message that contains a typing indicator
  chat.say('Hello, there! I am robot that follow\'s Asimov\'s rules. Just another smart decent robot').then(() => {
    chat.say('See, I like reading books. I can find for you books. Just type /help or help to see relevant info', { typing: true });
  });
});


/*
  Features:
  Search books on harper collins
  Get book recomendations on tastekid
  Get book estimated book price
  Get book synopsis
  Get Download link
*/


bot.hear(['/help', 'help'], (payload, chat) => {
  chat.say('Dude[tte], I am \'that\' guy. Use me to search for your books, get an estimated price of books, get synopsis, and wait for it... get download links.').then(() => {
    chat.say('Type @list to get my list of commands. To use a command just type <command> <parameters>');
  });
});

bot.hear(['@list'], (payload, chat) => {
  let test = "some test";
  chat.say({
    text: 'Usage: <command> <parameters>',
    buttons: [
      { type: 'postback', title:'@search', payload: 'SEARCH'}
    ]
  });
});

bot.on('postback:SEARCH', (payload, chat) => {
  chat.say('Usage: @search to look for books');
});

bot.hear('@search', (payload, chat) => {
  let askName = (convo) => {
    convo.ask(`Whats the book Title?`, (payload, convo) => {
      const text = payload.message.text;
      convo.set('title', text);
      convo.say(`Oh, your name is ${text}`).then(() => askAuthor(convo));
    });
  };

  const askAuthor = (convo) => {
    convo.ask(`Do you know the author? Tell me.`, (payload, convo) => {
      const text = payload.message.text;
      convo.set('author', text);
      convo.say(`Got it. Let me fetch something for you`).then(() => sendSummary(convo));
    });
  };

  const sendSummary = (convo) => {
    convo.say(`Ok, here's what you told me about your books:
              - Title: ${convo.get('title')}
              - Author: ${convo.get('author')}
Powered by GoodReads`);

    convo.end();
  };

  chat.conversation((convo) => {
    askName(convo);
  });
});
bot.start();
