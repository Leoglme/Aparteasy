import { format } from 'date-fns'

export function formatDate(value: string | Date, formatString: string): string {
  if (!value) return ''
  const date = new Date(value)

  return format(date, formatString)
}
