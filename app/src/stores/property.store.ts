import { defineStore } from 'pinia'
import router from '@/router'
import type {
  Property,
  PropertyCommand,
  PropertyWithLocations,
  Rating,
  UpdatePropertyCommand
} from '@/services/property/property.model'
import { PropertyService } from '@/services/property/property'
import { useSearchStore } from '@/stores/search.store'
import { useAppStore } from '@/stores/app.store'
import { useRouterStore } from '@/stores/router.store'
import { useRouter } from 'vue-router'
import { PropertyRatingService } from '@/services/propertyRating/propertyRating'
import { useAuthStore } from '@/stores/auth.store'

export const usePropertyStore = defineStore('propertyStore', {
  state: () => ({
    _properties: [] as Property[],
    _property: {} as PropertyWithLocations
  }),
  actions: {
    setProperties(properties: Property[]) {
      this._properties = properties
    },
    setProperty(property: PropertyWithLocations) {
      this._property = property
    },
    async fetchProperties() {
        // useAppStore().setPending(true)
        await useAppStore().execWithPending(async () => {
            const properties = await PropertyService.all()
            this.setProperties(properties.data || [])
        })
        // useAppStore().setPending(false)
    },
    async fetchSearchProperties(searchId: number) {
      useAppStore().setPending(true)
      const properties = await PropertyService.allBySearchId(searchId)
      this.setProperties(properties.data || [])
      useAppStore().setPending(false)
    },
    async fetchProperty(searchId: number, propertyId: number) {
      useAppStore().setPending(true)
      const property = await PropertyService.getById(searchId, propertyId)
      if (property.data) {
        this.setProperty(property.data)
      } else {
        await useRouter().push({ name: 'properties', params: { id: searchId } })
      }
      useAppStore().setPending(false)
    },
    async updateProperty(property: UpdatePropertyCommand, propertyId: number, searchId: number) {
      if (this._property.id === propertyId) {
        this._property = { ...this._property, ...property }
      }

      const index = this._properties.findIndex((p) => p.id === propertyId)
      if (index !== -1) {
        this._properties[index] = { ...this._properties[index], ...property }
      }
      await PropertyService.update(property, propertyId, searchId)
    },
    findPropertyById(id: number) {
      return this._properties.find((property) => property.id === id)
    },
    async createProperty(property: PropertyCommand) {
      const searchId = useSearchStore().currentSearchId
      const { data } = await PropertyService.create(property, searchId)
      if (data) {
        if (!this._properties) {
          this.setProperties([])
        }
        this._properties.unshift(data)
        await router.push({ name: 'properties', params: { id: searchId } })
      }
    },
    async deleteProperty(id: number) {
      const search_id = useSearchStore().currentSearchId
      await PropertyService.delete(id, search_id)
      this.setProperties(this._properties.filter((property) => property.id !== id))
    },
    async updateUserRating(rating: number, propertyId: number, searchId: number) {
      const propertyIndex = this._property.ratings.findIndex((r) => r.isUser)
      const user = useAuthStore().user

      if (propertyIndex !== -1) {
        const updatedRating = {
          ...this._property.ratings[propertyIndex],
          rating: rating
        }
        this._property.ratings.splice(propertyIndex, 1, updatedRating)
      } else {
        const newRating: Rating = {
          id: 5,
          rating,
          property_id: propertyId,
          user_id: user.id,
          user,
          isUser: true,
          created_at: new Date().toDateString(),
          updated_at: new Date().toDateString()
        }
        this._property.ratings.push(newRating)
      }

      this.updateAverageRating()
      await PropertyRatingService.update(rating, propertyId, searchId)
    },
    updateAverageRating() {
      const ratings = this._property.ratings
      const ratingsCount = ratings.length
      const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0)
      const averageRating = ratingsCount > 0 ? totalRating / ratingsCount : 0

      const averageQualityRating = this._property.quality_rating

      const combinedAverageRating =
        ratingsCount > 0 ? (averageRating + averageQualityRating) / 2 : averageQualityRating

      this._property = { ...this._property, average_ratings: Math.round(combinedAverageRating) }
    },
    reset() {
      this.setProperties([])
    }
  },
  getters: {
    property: (state): PropertyWithLocations => state._property,
    properties: (): Property[] => {
      return useRouterStore().applySearch(usePropertyStore()._properties, [
        'name',
        'price',
        'comment',
        'location.city',
        'location.address'
      ])
    },
    lastPropertyNumberOfRooms: (): number => {
      const properties = usePropertyStore()._properties
      return properties.length > 0 ? properties[properties.length - 1].number_of_rooms : 0
    }
  }
})
