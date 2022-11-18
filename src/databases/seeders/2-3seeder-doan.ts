const wrapValuesWithDateTime12 = require('../utils/wrapValuesWithDateTime.ts')

const doans = [
  {
    id: 1,
    tenDoAn: 'Khoai tây chiên',
    size: 's',
    gia: 30000,
  },
  {
    id: 2,
    tenDoAn: 'Khoai tây chiên',
    size: 'm',
    gia: 40000,
  },
  {
    id: 3,
    tenDoAn: 'Bắp rang bơ',
    size: 's',
    gia: 30000,
  },
  {
    id: 4,
    tenDoAn: 'Bắp rang bơ',
    size: 'm',
    gia: 35000,
  },
  {
    id: 5,
    tenDoAn: 'Cocacola',
    size: 's',
    gia: 30000,
  },
  {
    id: 6,
    tenDoAn: 'Cocacola',
    size: 'm',
    gia: 37000,
  },
  {
    id: 7,
    tenDoAn: 'Trà đào cam sả ',
    size: 's',
    gia: 30000,
  },
  {
    id: 8,
    tenDoAn: 'pepsi',
    size: 's',
    gia: 30000,
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('doans', wrapValuesWithDateTime12(doans))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('doans', {
        id: doans.map((doan) => doan.id),
      }),
    ]
  },
}
