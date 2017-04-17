
'use strict'

const slack = require('slack')
const _ = require('lodash')
const config = require('./config')

let bot = slack.rtm.client()

bot.started((payload) => {
  this.self = payload.self
})

const queue = [];


bot.message((msg) => {
  console.log('bot', bot)
  console.log('queue', queue, 'message', msg)
  if (!msg.user) return
  if (!_.includes(msg.text.match(/<@([A-Z0-9])+>/igm), `<@${this.self.id}>`)) return
  // console.log(msg.text);
  const message = msg.text.split(" ");
  const command = message[1];
  let response = "That is not one of the listed commands";
  const username = msg.user;

  if(command === 'hello') {
    response = "Hello there"
  }

  if(command === 'awake?') {
    response = "yes I'm awake"
  }

  if(command === 'awake?') {
    response = "yes I'm awake"
  };

  if(message[1] === 'how' && message[2] === 'are' && message[3] === 'you' && message[4] === 'doing?') {
    response = 'Not too bad actually.'
  }

  if(command === "q-me") {
    queue.push(username);
    response = `Current queue: ${queue}`;
  }

  if(command === "clear") {
    queue = [];
    response = `Current queue: ${queue}`;    
  }

  if(command === "status") {
    response = `Current queue: ${queue}`;    
  }

  slack.chat.postMessage({
    token: config('SLACK_TOKEN'),
    icon_emoji: config('ICON_EMOJI'),
    channel: msg.channel,
    username: 'Grace Hopper',
    text: `${response}`
    // text: `beep boop: I hear you loud and clear!"`
  }, (err, data) => {
    if (err) throw err

    let txt = _.truncate(data.message.text)

    console.log(`🤖  beep boop: I responded with "${txt}"`)
  })
})

module.exports = bot
