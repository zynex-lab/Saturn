const { Client, GatewayIntentBits, MessageEmbed } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ],
});

client.on('messageCreate', (message) => {
    // ตรวจสอบว่าเป็นคำสั่ง "!embed" หรือไม่
    if (message.content === '!embed') {
        // สร้าง Embed ที่มีภาพ
        const embed = new MessageEmbed()
            .setImage('https://cdn.discordapp.com/attachments/1337044208539668490/1344193935609692231/IMG_2873.png?ex=67c005a8&is=67beb428&hm=858721e5617745985979e9e147dcaf16aeb57adf0c8acd9b2ac2a6ca73c82ac9') // ใส่ URL ของภาพ
            .setColor('#00FF00');  // สีของ Embed (สามารถปรับตามต้องการ)

        // ส่ง Embed
        message.channel.send({ embeds: [embed] })
            .then(() => {
                // ส่งข้อความที่ไม่มีรูปภาพหลังจาก Embed
                message.channel.send('**Open a ticket to**\n1. Ask for support\n2. Report an issue\n3. Request information');
            })
            .catch((error) => {
                console.error('Error sending the embed:', error);
            });
    }
});

client.login(process.env.TOKEN);