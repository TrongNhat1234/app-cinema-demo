const wrapValuesWithDateTime9 = require('../utils/wrapValuesWithDateTime.ts')

const calamnhanviens = [
  {
    id_nhan_vien: 1,
    id_ca_lam: 1,
  },

  {
    id_nhan_vien: 1,
    id_ca_lam: 2,
  },

  {
    id_nhan_vien: 2,
    id_ca_lam: 1,
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
          calamnhanvien.id_nhan_vien, calamnhanvien.id_ca_lam
        }),
      }),
    ]
  },
}
