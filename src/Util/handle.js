import { readdirSync } from 'node:fs'

export class Handle {
  constructor(client) {
    this.client = client
  }

  async eventLoader() {
    const categories = readdirSync('src/events', { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)

    for (const category of categories) {
      const files = readdirSync(`src/events/${category}`).filter((file) => file.endsWith('.js'))

      for (const file of files) {
        const event = await import(`../events/${category}/${file}`)
        const handler = event.default || event

        if (handler.once) {
          this.client.once(handler.name, (...args) => handler.run(...args, this.client))
        } else {
          this.client.on(handler.name, (...args) => handler.run(...args, this.client))
        }

        console.log(`Event ${handler.name} Loaded`)
      }
    }
  }
}
