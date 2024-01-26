export default class FakeService {
  public static generateRandomHexColor(): string {
    const letters = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  public static generateDiceBearURL(name: string, avatarStyle = 'adventurer'): string {
    const backgroundColor = encodeURIComponent(this.generateRandomHexColor())
    return `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${encodeURIComponent(
      name
    )}&backgroundColor=${backgroundColor}`
  }
}
