import { defineStore } from 'pinia';
import router from '@/router'
import type { Property, PropertyCommand, UpdatePropertyCommand } from '@/services/property/property.model';
import { PropertyService } from '@/services/property/property';
import { useSearchStore } from '@/stores/search.store';
import { useAppStore } from '@/stores/app.store';
import { useRouterStore } from '@/stores/router.store'
import { useRouter } from 'vue-router'
import { th } from 'date-fns/locale'

export const usePropertyStore = defineStore('propertyStore', {
    state: () => ({
        _properties: [] as Property[],
        _property: {} as Property,
    }),
    actions: {
        setProperties(properties: Property[]) {
            this._properties = properties;
        },
        setProperty(property: Property) {
            this._property = property;
        },
        async fetchProperties(searchId: number) {
            useAppStore().setPending(true);
            const properties = await PropertyService.all(searchId);
            this.setProperties(properties.data || [])
            useAppStore().setPending(false);
        },
        async fetchProperty(searchId: number, propertyId: number) {
            useAppStore().setPending(true);
            const property = await PropertyService.getById(searchId, propertyId);
            if (property.data){
                this.setProperty(property.data)
            }else {
             await useRouter().push({ name: 'properties', params: { id: searchId } });
            }
            useAppStore().setPending(false);
        },
        async updateProperty(property: UpdatePropertyCommand, propertyId: number, searchId: number) {
            if (this._property.id === propertyId) {
                this._property = { ...this._property, ...property };
            }
            const index = this._properties.findIndex(p => p.id === propertyId);
            if (index !== -1) {
                this._properties[index] = { ...this._properties[index], ...property };
            }
            // await PropertyService.update(property, propertyId, searchId);
        },
        findPropertyById(id: number) {
            return this._properties.find(property => property.id === id);
        },
        async createProperty(property: PropertyCommand) {
            const searchId = useSearchStore().currentSearchId;
            const { data } = await PropertyService.create(property, searchId);
            if (data) {
                if(!this._properties) {
                    this.setProperties([]);
                }
                this._properties.unshift(data)
                await router.push({ name: 'properties', params: { id: searchId } });
            }
        },
        async deleteProperty(id: number) {
            const search_id = useSearchStore().currentSearchId;
            await PropertyService.delete(id, search_id);
            this.setProperties(this._properties.filter(property => property.id !== id));
        },
        reset() {
            this.setProperties([])
        }
    },
    getters: {
        property: (state): Property => state._property,
        properties: (): Property[] => {
            return useRouterStore().applySearch(usePropertyStore()._properties,
                ['name', 'price', 'comment', 'location.city', 'location.address']
            )
        },
        lastPropertyNumberOfRooms: (): number => {
            const properties = usePropertyStore()._properties;
            return properties.length > 0 ? properties[properties.length - 1].number_of_rooms : 0;
        }
    }
});
