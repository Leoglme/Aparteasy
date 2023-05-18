import BaseService from 'App/Services/BaseService'
import Encryption from '@ioc:Adonis/Core/Encryption'
import User from 'App/Models/User'
import PasswordResetToken from 'App/Models/PasswordResetToken'
import { DateTime } from 'luxon'

export default class PasswordResetTokenService extends BaseService {
  public static async create(user: User) {
    const token = this.generateResetPasswordToken(user.email)
    const expiresAt = DateTime.local().plus({ minutes: 15 })
    return await PasswordResetToken.create({ user_id: user.id, token, expires_at: expiresAt })
  }

  public static async delete(id: number) {
    const property = await PasswordResetToken.find(id)
    await property?.delete()
  }

  public static async findByUserId(user_id: number) {
    return await PasswordResetToken.findBy('user_id', user_id)
  }

  public static async findByToken(token: string) {
    return await PasswordResetToken.findBy('token', token)
  }
  public static decryptResetPasswordToken(token: string): string | null {
    return Encryption.decrypt(token)
  }
  public static generateResetPasswordToken = (email: string) => {
    return Encryption.encrypt(email)
  }
}
