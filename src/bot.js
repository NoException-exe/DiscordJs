import 'dotenv/config'
import { Client, GatewayIntentBits, Collection } from 'discord.js'
import { Handle } from './Util/handle.js'

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
    })

    this.eventLoader = new Handle(this)
  }

  async start() {
    await super.login(process.env.BOT_TOKEN)
    await this.eventLoader.eventLoader()
  }
}

const start = new Bot()

await start.start()
