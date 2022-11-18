const wrapValuesWithDateTime8 = require('../utils/wrapValuesWithDateTime.ts')

const calams = [
  {
    id: 1,
    gioBatDau: '08:00:00',
    gioKetThuc: '16:00:00',
  },
  {
    id: 2,
    gioBatDau: '04:30:00',
    gioKetThuc: '22:30:00',
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('calams', wrapValuesWithDateTime8(calams))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('calams', {
        id: theloais.map((calamnhanvien) => calamnhanvien.id),
      }),
    ]
  },
}
