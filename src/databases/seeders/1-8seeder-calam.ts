const wrapValuesWithDateTime8 = require('../utils/wrapValuesWithDateTime.ts')

const calams = [
  {
    id: 1,
    gio_bat_dau: '08:00:00',
    gio_ket_thuc: '16:00:00',
  },
  {
    id: 2,
    gio_bat_dau: '04:30:00',
    gio_ket_thuc: '22:30:00',
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('calams', wrapValuesWithDateTime8(calams))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('calams', {
        id: calams.map((calam) => calam.id),
      }),
    ]
  },
}
