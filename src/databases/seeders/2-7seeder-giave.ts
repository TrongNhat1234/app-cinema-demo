const wrapValuesWithDateTime16 = require('../utils/wrapValuesWithDateTime.ts')

const giaves = [
  {
    id: 1,
    gia_ve: 23710,
  },
  {
    id: 2,
    gia_ve: 543543,
  },
  {
    id: 3,
    gia_ve: 546,
  },
  {
    id: 4,
    gia_ve: 534534,
  },
  {
    id: 5,
    gia_ve: 40000,
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('giaves', wrapValuesWithDateTime16(giaves))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('giaves', {
        id: giaves.map((giave) => giave.id),
      }),
    ]
  },
}
