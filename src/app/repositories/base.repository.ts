import { Service } from 'typedi'
import { ModelCtor, Model } from 'sequelize-typescript'
import { BaseRepositoryInterface } from './interfaces/base.repository.interface'
import { env } from '@env'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'

@Service()
export abstract class BaseRepository<M extends Model> implements BaseRepositoryInterface {
  protected model: ModelCtor<M>

  constructor(model: ModelCtor<M>) {
    this.model = model
  }

  modelName = function () {
    const nameModel: string = this.model.toString().split(' ')[1].toLowerCase() + 's'
    return nameModel
  }

  async findById(id: number): Promise<M> {
    return this.model.findByPk(id)
  }

  async getAll() {
    return await DB.sequelize.query('SELECT * FROM ' + this.modelName() + ' where is_delete = 0', {
      type: QueryTypes.SELECT,
    })
  }

  async getAllAndCount(): Promise<{ rows: M[]; count: number }> {
    return this.model.findAndCountAll({ raw: true })
  }

  async findByCondition(object: Object): Promise<M> {
    return this.model.findOne(object)
  }

  async findOrCreateByCondition(object: Object): Promise<[M, boolean]> {
    return this.model.findOrCreate(object)
  }

  async getByCondition(whereClause: any, offset: number, limit: number, orderBy: any) {
    return this.model.findAndCountAll({
      where: whereClause,
      order: orderBy,
      offset,
      limit,
    })
  }

  async create(object: any): Promise<M> {
    console.log(this.model)
    return this.model.create(object)
  }

  async createWithAssociation(object: any, association: any) {
    return this.model.create(object, association)
  }

  async deleteById(id: any) {
    return await DB.sequelize.query(
      'update ' + this.modelName() + ' set is_delete = 1,updated_at = NOW() where id = ' + id,
      {
        type: QueryTypes.UPDATE,
      },
    )
  }

  async update(object: Object, condition: any): Promise<any> {
    return this.model.update(object, condition)
  }

  /**
   * create equal predicate for where clause.
   * @private
   * @param {{
   *   key: string,
   *   value: primitive | Array<primitive | Date> | Date,
   *   allowNull: boolean,
   * }}
   * @returns {{
   *   key: primitive | Array<primitive | Date> | Date
   * }}
   */
  _createEqualWhereClause({ key, value, allowNull = false }): object {
    if (!allowNull && this._isNullish(value)) {
      return {}
    }

    return {
      [key]: value,
    }
  }

  /**
     * is nullish
     * @private
     @param {} value
     * @returns {boolean} true: nullish
     */
  _isNullish(value): boolean {
    return value === undefined || value === null
  }
}
