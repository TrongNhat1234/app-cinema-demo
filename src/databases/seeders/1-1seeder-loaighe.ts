const wrapValuesWithDateTime2 = require('../utils/wrapValuesWithDateTime.ts')

const loaighes = [
  {
    id: 1,
    tenGhe: 'ghe01',
  },
  {
    id: 2,
    tenGhe: 'ghe02',
  },
  {
    id: 3,
    tenGhe: 'ghe03',
  },
  {
    id: 4,
    tenGhe: 'ghe04',
  },
  {
    id: 5,
    tenGhe: 'ghe05',
  },
  {
    id: 6,
    tenGhe: 'ghe06',
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('loaighes', wrapValuesWithDateTime2(loaighes))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('loaighes', {
        id: loaighes.map((ghengoi) => ghengoi.id),
      }),
    ]
  },
}
