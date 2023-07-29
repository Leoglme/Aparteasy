import axios from 'axios'
import { API_URL } from '@/env'
import type {
  Property,
  PropertyCommand,
  PropertyWithLocations,
  UpdatePropertyCommand
} from '@/services/property/property.model'

export class PropertyService {
  public static propertyApiUrl = `${API_URL}/api/searches`
  static async all(searchId: number): Promise<{ data: Property[] | never[] }> {
    const url = `${this.propertyApiUrl}/${searchId}/properties`
    return await axios.get(url)
  }

  static async getById(
    searchId: number,
    propertyId: number
  ): Promise<{ data: PropertyWithLocations | undefined }> {
    const url = `${this.propertyApiUrl}/${searchId}/properties/${propertyId}`
    return await axios.get(url)
  }

  static async update(
    property: UpdatePropertyCommand,
    propertyId: number,
    searchId: number
  ): Promise<{ data: Property }> {
    const url = `${this.propertyApiUrl}/${searchId}/properties/${propertyId}`
    return await axios.put(url, property)
  }

  static async create(property: PropertyCommand, searchId: number): Promise<{ data: Property }> {
    const url = `${this.propertyApiUrl}/${searchId}/properties`
    return await axios.post(url, property)
  }

  static async delete(id: number, search_id: number): Promise<null> {
    const url = `${this.propertyApiUrl}/${search_id}/properties/${id}`
    return await axios.delete(url)
  }
}
