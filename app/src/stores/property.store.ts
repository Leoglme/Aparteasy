import { defineStore } from 'pinia';
import router from '@/router'
import type { Property, PropertyCommand } from '@/services/property/property.model';
import { PropertyService } from '@/services/property/property';
import { useSearchStore } from '@/stores/search.store';
import { useAppStore } from '@/stores/app.store';
import { useRouterStore } from '@/stores/router.store'

export const usePropertyStore = defineStore('propertyStore', {
    state: () => ({
        _properties: [] as Property[],
    }),
    actions: {
        setProperties(properties: Property[]) {
            this._properties = properties;
        },
        async fetchProperties(searchId: number) {
            useAppStore().setPending(true);
            const properties = await PropertyService.all(searchId);
            this.setProperties(properties.data || [])
            useAppStore().setPending(false);
        },
        updateProperty(property: Property) {
            const index = this._properties.findIndex(p => p.id === property.id);
            if (index !== -1) {
                this._properties[index] = property;
            }
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
