import "dotenv/config";
import { Client, GatewayIntentBits, Collection } from "discord.js";

export class Bot extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildModeration,
      ],
    });
  }

  start() {
    super.login(process.env.BOT_TOKEN);
  }
}

new Bot().start();
