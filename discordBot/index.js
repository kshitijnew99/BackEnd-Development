require("dotenv").config()

const { Client , GatewayIntentBits } = require("discord.js")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
})

client.on("ready" , () => {
    console.log("Bot is ready!");
})


client.on("messageCreate" ,(message)=> {
    console.log(`Message form User : ${message.content}`);

    const isBot = message.author.bot;
    if(isBot) return;
    
    message.reply("Hello! how can I help you Today?");
    
})

client.login(process.env.DISCORD_BOT_TOKEN)