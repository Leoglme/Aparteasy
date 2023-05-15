import axios from "axios";
import { API_URL } from "@/env";
import type { Rating } from "@/services/property/property.model";


export class PropertyRatingService {
    public static propertyApiUrl = `${API_URL}/api/searches`

    static async update(rating: number, propertyId: number, searchId: number): Promise<{
        data: Rating
    }> {
        const url = `${this.propertyApiUrl}/${searchId}/properties/${propertyId}/ratings`
        return await axios.put(url, { rating })
    }
}
