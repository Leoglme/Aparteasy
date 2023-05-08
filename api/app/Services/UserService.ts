import User from 'App/Models/User'

export class UserService {
  public static async findByEmail(email: string) {
    return await User.findBy('email', email)
  }
}
