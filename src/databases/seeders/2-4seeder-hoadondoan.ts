const wrapValuesWithDateTime13 = require('../utils/wrapValuesWithDateTime.ts')

const hoadondoans = [
  {
    id: 1,
    giam_gia: 0.5,
    tong_tien: 50000,
  },
  {
    id: 2,
    giam_gia: 0.5,
    tong_tien: 40000,
  },
  {
    id: 3,
    giam_gia: 0.1,
    tong_tien: 90000,
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
