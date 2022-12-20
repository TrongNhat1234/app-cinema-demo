const wrapValuesWithDateTime2 = require('../utils/wrapValuesWithDateTime.ts')

const loaighes = [
  {
    id: 1,
    ten_ghe: 'Standard',
  },
  {
    id: 2,
    ten_ghe: 'Vip',
  },
  {
    id: 3,
    ten_ghe: 'SweetBox',
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('loaighes', wrapValuesWithDateTime2(loaighes))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('loaighes', {
        id: loaighes.map((loaighe) => loaighe.id),
      }),
    ]
  },
}
