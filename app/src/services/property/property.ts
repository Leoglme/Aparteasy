import axios from "axios";
import { API_URL } from "@/env";
import type { Property, PropertyCommand } from "@/services/property/property.model";

export class PropertyService {
    public static searchApiUrl = `${API_URL}/api/searches`
    public static propertyApiUrl = `${API_URL}/api/properties`
    static async all(searchId: number): Promise<{data: Property[] | never[]}> {
        const url = `${this.searchApiUrl}/${searchId}/properties`
        return await axios.get(url)
    }

    static async create(location: PropertyCommand): Promise<{data: Property}> {
        return await axios.post(this.propertyApiUrl, location)
    }

    static async delete(id: number): Promise<null> {
        const url = `${this.propertyApiUrl}/${id}`
        return await axios.delete(url)
    }
}
