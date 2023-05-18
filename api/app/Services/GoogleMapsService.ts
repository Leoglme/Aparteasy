import { Client, TravelMode } from '@googlemaps/google-maps-services-js'
import Env from '@ioc:Adonis/Core/Env'

export class GoogleMapsService {
  private static client = new Client({})

  public static async getTravelTimes(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number }
  ): Promise<{ driving?: number; walking?: number; transit?: number }> {
    const result: { driving?: number; walking?: number; transit?: number } = {}
    const modes: TravelMode[] = [TravelMode.driving, TravelMode.walking, TravelMode.transit]
    for (const mode of modes) {
      const response = await this.client.directions({
        params: {
          origin: `${origin.lat},${origin.lng}`,
          destination: `${destination.lat},${destination.lng}`,
          mode: mode,
          key: Env.get('GOOGLE_API_KEY'),
        },
      })

      if (response.data.status === 'OK') {
        const leg = response.data.routes[0].legs[0]
        result[mode] = leg.duration.value // SECONDS
      }
    }

    return result
  }
}
