export const convertToNumber = (value: string) => {
  return value ? parseFloat(value) : 0
}

export function formatString(input?: string): string {
  if (!input) return ''
  // Supprime tous les espaces
  let formattedString = input.replace(/\s/g, '')

  // Supprime les accents
  formattedString = formattedString.normalize('NFD').replace(/[\u0300-\u036F]/g, '')

  // Supprime les caractères spéciaux
  formattedString = formattedString.replace(/[^a-zA-Z0-9]/g, '')

  // Convertit en minuscules
  formattedString = formattedString.toLowerCase()

  return formattedString
}
