import { getValueWithPath } from '@/utils/array.utils'
import { formatString } from '@/utils/formats.utils'

/**
 * Filter an array of objects by a search text, and a list of properties
 * to include in the search
 * @param objects The array of objects to filter
 * @param text The search text to filter by
 * @param properties An array of properties to include in the search
 * @returns An array of objects that match the search criteria
 */

export function filterBySearchText<T>(objects: Array<T>, text: string, properties: Array<string>): Array<T> {
    return (
        objects.filter((object) => {
            return properties.some((property) => {
                const value = getValueWithPath(object, property)
                return value && value.toString().toLowerCase().includes(formatString(text))
            })
        }) || []
    )
}
