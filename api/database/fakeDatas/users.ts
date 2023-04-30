import { Chance } from 'chance'
import FakeService from 'App/Services/FakeService'

interface User {
  email: string
  name: string
  password: string
  avatarUrl: string
}

export function generateUsers(n: number): User[] {
  const chance = new Chance()
  const users: User[] = []
  for (let i = 0; i < n; i++) {
    const email = chance.email()
    const name = chance.name()
    const password = 'password'
    const avatarUrl = FakeService.generateDiceBearURL(name)
    users.push({ email, name, password, avatarUrl })
  }
  return users
}
