 const { Client, GatewayIntentBits, ActivityType, MessageEmbed } = require('discord.js');
require('dotenv').config();
const express = require('express');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ],
});

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  const imagePath = path.join(__dirname, 'index.html');
  res.sendFile(imagePath);
});
app.listen(port, () => {
  console.log('\x1b[36m[ SERVER ]\x1b[0m', '\x1b[32m SH : http://localhost:' + port + ' ✅\x1b[0m');
});

// status จ้า
function updateStatus() {
  const now = new Date();
  // ใช้ Intl.DateTimeFormat เพื่อตั้งโซนเวลาให้เป็น Asia/Bangkok
  const formattedDate = new Intl.DateTimeFormat('th-TH', {
    timeZone: 'Asia/Bangkok', // กำหนดโซนเวลา
    day: 'numeric',
    month: 'numeric',
    year: '2-digit', // ปีแสดงแค่ 2 หลักสุดท้าย
  }).format(now);

  const statusMessage = `📆 ${formattedDate}\n discord.gg/E6ynK4r7WA`; // ข้อความสถานะ

  client.user.setPresence({
    activities: [{
      name: statusMessage,
      type: ActivityType.Streaming,
      url: 'https://www.twitch.tv/veiinne/home'
    }],
    status: 'online',
  });

  console.log('\x1b[33m[ STATUS ]\x1b[0m', `Updated status to: ${statusMessage}`);
}

async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log('\x1b[36m[ LOGIN ]\x1b[0m', `\x1b[32mLogged in as: ${client.user.tag} ✅\x1b[0m`);
    console.log('\x1b[36m[ INFO ]\x1b[0m', `\x1b[35mBot ID: ${client.user.id} \x1b[0m`);
    console.log('\x1b[36m[ INFO ]\x1b[0m', `\x1b[34mConnected to ${client.guilds.cache.size} server(s) \x1b[0m`);
  } catch (error) {
    console.error('\x1b[31m[ ERROR ]\x1b[0m', 'Failed to log in:', error);
    process.exit(1);
  }
}

function heartbeat() {
  setInterval(() => {
    console.log('\x1b[35m[ HEARTBEAT ]\x1b[0m', `Bot is alive at ${new Date().toLocaleTimeString('th-TH')}`);
  }, 30000);
}

client.once('ready', () => {
  console.log('\x1b[36m[ INFO ]\x1b[0m', `\x1b[34mPing: ${client.ws.ping} ms \x1b[0m`);
  updateStatus(); // อัปเดตสถานะครั้งแรก
  setInterval(updateStatus, 60000); // อัปเดตทุก 60 วินาที (1 นาที)
  heartbeat();
});

client.on('messageCreate', (message) => {
    // ตรวจสอบว่าเป็นคำสั่ง "!embed" หรือไม่
    if (message.content === '!embed') {
        const embed = new MessageEmbed()
            .setImage('https://cdn.discordapp.com/attachments/1337044208539668490/1344182971699040377/EE1D3169-DABC-416D-8D81-55A088C9BD93.gif?ex=67bffb72&is=67bea9f2&hm=1fdb547229444a402292719deeae5d34e4ebf250af3b18d5f2120edd9ea5411d&') // ใส่ URL ของภาพ
            .setColor('#010101')  // สีของ Embed


        message.channel.send({ embeds: [embed] });
        // ส่งข้อความที่ไม่มีรูปภาพด้านล่าง
        message.channel.send(`**Open a ticket to**\n1. Ask for support\n2. Report an issue\n3. Request information`);
    }
});

login();