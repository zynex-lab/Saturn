const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
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

const statusMessage = `૮꒰ 𝐙𝐲𝐧𝐞𝐱 ꒱ა\n📆 ꒷꒦ ${formattedDate} ꒷꒦\n discord.gg/E6ynK4r7WA`; // ข้อความสถานะ

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

login();
