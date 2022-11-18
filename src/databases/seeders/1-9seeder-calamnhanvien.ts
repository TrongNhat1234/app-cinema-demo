const wrapValuesWithDateTime9 = require('../utils/wrapValuesWithDateTime.ts')

const calamnhanviens = [
  {
    idNhanVien: 1,
    idCaLam: 1,
  },

  {
    idNhanVien: 1,
    idCaLam: 2,
  },

  {
    idNhanVien: 2,
    idCaLam: 1,
  },
]

module.exports = {
  async up(queryInterface) {
    return [
      await queryInterface.bulkInsert('calamnhanviens', wrapValuesWithDateTime9(calamnhanviens)),
    ]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('calamnhanviens', {
        id: calamnhanviens.map((calamnhanvien) => {
          calamnhanvien.idNhanVien, calamnhanvien.idCaLam
        }),
      }),
    ]
  },
}
