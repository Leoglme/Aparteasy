import axios from "axios";
import { API_URL } from "@/env";
import type { Property, PropertyCommand } from "@/services/property/property.model";

export class PropertyService {
    public static propertyApiUrl = `${API_URL}/api/searches`
    static async all(searchId: number): Promise<{data: Property[] | never[]}> {
        const url = `${this.propertyApiUrl}/${searchId}/properties`
        return await axios.get(url)
    }

    static async create(property: PropertyCommand, searchId: number): Promise<{data: Property}> {
        const url = `${this.propertyApiUrl}/${searchId}/properties`
        return await axios.post(url, property)
    }

    static async delete(id: number, search_id: number): Promise<null> {
        const url = `${this.propertyApiUrl}/${search_id}/properties/${id}`
        return await axios.delete(url)
    }
}
