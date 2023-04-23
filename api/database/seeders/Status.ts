import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Status from 'App/Models/Status'
import { StatusEnum } from 'App/Enums/StatusEnum'

export default class extends BaseSeeder {
  public async run() {
    await Status.createMany([{ name: StatusEnum.NOT_AVAILABLE }, { name: StatusEnum.CONTACTED }])
  }
}
