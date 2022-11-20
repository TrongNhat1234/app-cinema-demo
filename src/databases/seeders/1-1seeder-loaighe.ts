const wrapValuesWithDateTime2 = require('../utils/wrapValuesWithDateTime.ts')

const loaighes = [
  {
    id: 1,
    ten_ghe: 'ghe01',
  },
  {
    id: 2,
    ten_ghe: 'ghe02',
  },
  {
    id: 3,
    ten_ghe: 'ghe03',
  },
  {
    id: 4,
    ten_ghe: 'ghe04',
  },
  {
    id: 5,
    ten_ghe: 'ghe05',
  },
  {
    id: 6,
    ten_ghe: 'ghe06',
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
