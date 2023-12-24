import { ActivityType, Events } from 'discord.js'

export default {
  name: Events.ClientReady,
  once: false,
  async run(client) {
    console.log('Bot is ready!')
    client.user.setActivity('Izken', { type: ActivityType.Listening })
  },
}
