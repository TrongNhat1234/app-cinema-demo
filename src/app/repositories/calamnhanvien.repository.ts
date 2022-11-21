import CaLamNhanVien from '@models/entities/calamnhanvien.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { CaLamNhanVienRepositoryInterface } from './interfaces/calamnhanvien.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from 'class-validator'

@Service({ global: true })
class CaLamNhanVienRepository
  extends BaseRepository<CaLamNhanVien>
  implements CaLamNhanVienRepositoryInterface<CaLamNhanVien>
{
  constructor(@ModelContainer(CaLamNhanVien.tableName) CaLamNhanVien: ModelCtor<CaLamNhanVien>) {
    super(CaLamNhanVien)
  }

  modelName = function () {
    const nameModel: string = this.model.toString().split(' ')[1].toLowerCase() + 's'
    return nameModel
  }
}

export default CaLamNhanVienRepository
