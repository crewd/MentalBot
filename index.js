const Discord = require('discord.js');
const config = require('./config.json')
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {

  const text = msg.content

  if (text === "!도움") {
    const embed = new Discord.MessageEmbed()
      .setAuthor("멘탈봇", "https://pbs.twimg.com/profile_images/1315693796101824513/_z-7_NER.jpg")
      .setTitle("⭐ 멘탈봇 사용법 ⭐")
      .setColor('ffff00')
      .addField('❓ 랜덤픽', '!랜덤픽 명령어를 사용하여 뒤에 랜덤으로 뽑을 항목들을 ,를 사용하여 나열')
      .addField('예시)', '!랜덤픽 1,2,3 or !랜덤픽1, 2, 3 등')
      .addField('🎲 랜덤숫자', '!랜덤숫자 명령어와 랜덤으로 뽑을 숫자를 함께 입력')
      .addField('예시)', '!랜덤숫자 9 or !랜덤숫자3 등')
      .addField('🗳 찬반투표', '!투표 명령어와 투표할 내용을 입력')
      .addField('예시)', '!투표 게임 할 사람 or !투표 밥 먹을 사람')
    msg.channel.send(embed);
  }

  else if (text.startsWith("!랜덤픽")) {
    const randomArray = text.slice(5).split(',');

    const random = Math.floor(Math.random() * randomArray.length);

    const embed = new Discord.MessageEmbed()
      .setTitle("❓ 랜덤픽 결과")
      .setDescription(randomArray.length === 1 || randomArray.length === false ? "다시 입력해 주삼" : randomArray[random])
      .setColor('ffff00')

    msg.channel.send(embed)
  }

  else if (text.startsWith("!랜덤숫자")) {
    const randomNum = text.replace(/[^0-9]/g, "");
    const random = Math.ceil(Math.random() * randomNum);

    const embed = new Discord.MessageEmbed()
      .setTitle("🎲 랜덤숫자")
      .setDescription(randomNum ? random : "다시 입력해 주삼")
      .setColor('ffff00')

    msg.channel.send(embed);
  } 

  else if (text.startsWith("!투표")) {
    const voteValue = text.slice(3).trim();

    const embed = new Discord.MessageEmbed()
      .setTitle("🗳 투표")
      .setDescription(voteValue)
      .setColor('ffff00')

    msg.channel.send(embed)
    .then((value) => {
      value.react("👍🏾")
      value.react("👎🏾")
    });
  }

});

client.login(config.BOT_TOKEN);
