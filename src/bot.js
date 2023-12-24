import 'dotenv/config'
import { Client, GatewayIntentBits, Collection } from 'discord.js'
import { EventLoader } from './Util/eventLoader.js'

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

    this.eventLoader = new EventLoader(this)
  }

  async start() {
    await super.login(process.env.BOT_TOKEN).then(async () => {
      this.eventLoader.loadEvents()
    })
  }
}

const start = new Bot()

await start.start()
