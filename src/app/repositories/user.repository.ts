import User from '@models/entities/user.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { UserRepositoryInterface } from './interfaces/user.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
import { env } from '@env'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from 'class-validator'

@Service({ global: true })
class UserRepository extends BaseRepository<User> implements UserRepositoryInterface<User> {
  constructor(@ModelContainer(User.tableName) User: ModelCtor<User>) {
    super(User)
  }

  async findByEmail(email: string) {
    return await DB.sequelize.query("SELECT * FROM `users` WHERE email = '" + email + "'", {
      type: QueryTypes.SELECT,
    })
  }

  async findOrCreateByEmail(email: string, password: string) {
    const customer = await DB.sequelize.query(
      "SELECT * FROM `users` WHERE email = '" + email + "' and  password = '" + password + "'",
      { type: QueryTypes.SELECT },
    )
    console.log(customer)
    if (isEmpty(customer)) {
      return customer
    } else {
      return await DB.sequelize.query(
        "INSERT INTO users (email, password) VALUES ('" + email + "', '" + password + "')",
        // "INSERT INTO `users` (email, password) VALUES('" + email + "','" + password + "')",
        {
          type: QueryTypes.INSERT,
        },
      )
    }
  }

  async findByAddress(address: string): Promise<User> {
    return this.findByCondition({
      where: { address: address },
      raw: true,
    })
  }
}

export default UserRepository
