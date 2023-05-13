import { createClient, Client } from '@google/maps'

export class GoogleMapsService {
  private static client: Client

  public static init(apiKey: string) {
    this.client = createClient({
      key: apiKey,
      Promise: Promise,
    })
  }

  public static async getTravelTimes(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number }
  ): Promise<{ driving?: number; walking?: number; transit?: number }> {
    const result: { driving?: number; walking?: number; transit?: number } = {}
    const modes = ['driving', 'walking', 'transit']
    for (const mode of modes) {
      const response = await this.client
        .distanceMatrix({
          origins: [origin],
          destinations: [destination],
          mode: mode,
        })
        .asPromise()

      const element = response.json.rows[0].elements[0]
      if (element.status === 'OK') {
        result[mode] = element.duration.value // SECONDES
      }
    }

    return result
  }
}
