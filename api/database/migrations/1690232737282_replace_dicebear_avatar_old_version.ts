import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import User from 'App/Models/User'
import FakeService from 'App/Services/FakeService'

export default class ReplaceDiceBearAvatarOldVersion extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    // Find all users with old dicebear avatar (e.g., https://avatars.dicebear.com/api/adventurer/Vernon%20Patterson.svg?background=%23392FF7)
    const users: User[] = await User.query()
      .where('avatar_url', 'LIKE', '%avatars.dicebear.com%')
      .exec()

    // Replace old dicebear avatar with new dicebear avatar
    for (const user of users) {
      user.avatarUrl = FakeService.generateDiceBearURL(user.name)
      await user.save()
    }
  }

  public async down() {}
}
