import GheNgoi from '@models/entities/ghengoi.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { GheNgoiRepositoryInterface } from './interfaces/ghengoi.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from 'class-validator'

@Service({ global: true })
class GheNgoiRepository
  extends BaseRepository<GheNgoi>
  implements GheNgoiRepositoryInterface<GheNgoi>
{
  constructor(@ModelContainer(GheNgoi.tableName) GheNgoi: ModelCtor<GheNgoi>) {
    super(GheNgoi)
  }

  modelName = function () {
    const nameModel: string = this.model.toString().split(' ')[1].toLowerCase() + 's'
    return nameModel
  }
  async getGheDaMua(idSuatChieu: number) {
    const ghes = await DB.sequelize.query(
      'call ds_ghe_damua_phim_suatchieu( ' + idSuatChieu + '  )',
      { type: QueryTypes.CALL },
    )
    return ghes
  }

  async getGheChuaMua(idSuatChieu: number) {
    const ghes = await DB.sequelize.query(
      'call ds_ghe_chuamua_phim_suatchieu( ' + idSuatChieu + '  )',
      { type: QueryTypes.CALL },
    )
    return ghes
  }

  async getGheDangChon(idSuatChieu: number) {
    const ghes = await DB.sequelize.query(
      'call ds_ghe_dangchon_phim_suatchieu( ' + idSuatChieu + '  )',
      { type: QueryTypes.CALL },
    )
    return ghes
  }
}

export default GheNgoiRepository
