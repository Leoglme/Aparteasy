import { createClient, Client, TravelMode } from '@google/maps'

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
    destination: { lat: number; lng: number },
    modes: TravelMode[]
  ): Promise<{ [mode in TravelMode]?: number }> {
    const result: { [mode in TravelMode]?: number } = {}

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
        result[mode] = element.duration.value / 60 // Convertir les secondes en minutes
      }
    }

    return result
  }
}
