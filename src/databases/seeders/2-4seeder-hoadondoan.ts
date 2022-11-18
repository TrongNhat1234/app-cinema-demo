const wrapValuesWithDateTime13 = require('../utils/wrapValuesWithDateTime.ts')

const hoadondoans = [
  {
    id: 1,
    giamgia: 0.5,
    tongTien: 50000,
  },
  {
    id: 2,
    giamgia: 0.5,
    tongTien: 40000,
  },
  {
    id: 3,
    giamgia: 0.1,
    tongTien: 90000,
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('hoadondoans', wrapValuesWithDateTime13(hoadondoans))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('hoadondoans', {
        id: hoadondoans.map((hoadondoan) => hoadondoan.id),
      }),
    ]
  },
}
