import { ActivityType, Events } from 'discord.js'

export default class ReadyEvent {
  constructor(client) {
    this.client = client
    this.name = Events.ClientReady
    this.once = false
  }

  async run() {
    console.log('Bot is ready!')
    this.client.user.setActivity('Izken', { type: ActivityType.Listening })
  }
}
