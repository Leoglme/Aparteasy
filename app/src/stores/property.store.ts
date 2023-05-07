import { defineStore } from 'pinia';
import router from '@/router'
import type { Property, PropertyCommand } from "@/services/property/property.model";
import { PropertyService } from "@/services/property/property";
import { useSearchStore } from "@/stores/search.store";
import { useAppStore } from "@/stores/app.store";

export const usePropertyStore = defineStore('propertyStore', {
    state: () => ({
        properties: [] as Property[],
    }),
    actions: {
        setProperties(properties: Property[]) {
            this.properties = properties;
        },
        async fetchProperties(searchId: number) {
            useAppStore().setPending(true);
            const properties = await PropertyService.all(searchId);
            this.setProperties(properties.data)
            useAppStore().setPending(false);
        },
        updateProperty(property: Property) {
            const index = this.properties.findIndex(p => p.id === property.id);
            if (index !== -1) {
                this.properties[index] = property;
            }
        },
        findPropertyById(id: number) {
            return this.properties.find(property => property.id === id);
        },
        async createProperty(property: PropertyCommand) {
            const { data } = await PropertyService.create(property);
            if (data) {
                this.properties.push(data);
                await router.push({ name: 'properties', params: { id: useSearchStore().currentSearchId } });
            }
        },
        async deleteProperty(id: number) {
            await PropertyService.delete(id);
            this.properties = this.properties.filter(property => property.id !== id);
        },
    },
    getters: {}
});
