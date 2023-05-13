import { getValueWithPath } from '@/utils/array.utils'
import { formatString } from '@/utils/formats.utils'

/**
 * Filter an array of objects by a search text, and a list of properties
 * to include in the search
 * @param objects The array of objects to filter
 * @param text The search text to filter by
 * @param items An array of properties to include in the search
 * @returns An array of objects that match the search criteria
 */

export function filterBySearchText<T>(objects: Array<T>, text: string, items: Array<string>): Array<T> {
    return (
        objects.filter((object) => {
            return items.some((item) => {
                const value = getValueWithPath(object, item)
                return value && value.toString().toLowerCase().includes(formatString(text))
            })
        }) || []
    )
}
