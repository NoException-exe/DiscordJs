import { readdirSync } from 'fs'

export class EventLoader {
  constructor(client) {
    this.client = client
  }

  async loadEvents() {
    const categories = readdirSync('src/events', { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)

    for (const category of categories) {
      const files = readdirSync(`src/events/${category}`).filter((file) => file.endsWith('.js'))

      for (const file of files) {
        try {
          console.log(`Attempting to load event: ${file}`)
          const { default: EventClass } = await import(`../events/${category}/${file}`)
          console.log(`Event ${file} loaded`)

          const eventInstance = new EventClass(this.client)

          if (eventInstance.once) {
            this.client.once(eventInstance.name, (...args) => {
              console.log(`Event ${eventInstance.name} emitted.`)
              eventInstance.run(...args, this.client)
            })
          } else {
            this.client.on(eventInstance.name, (...args) => {
              console.log(`Event ${eventInstance.name} emitted.`)
              eventInstance.run(...args, this.client)
            })
          }

          console.log(`Event ${eventInstance.name} loaded`)
        } catch (error) {
          console.error(`Error loading event ${file}:`, error)
        }
      }
    }
  }
}
