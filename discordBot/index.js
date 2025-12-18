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

client.login()