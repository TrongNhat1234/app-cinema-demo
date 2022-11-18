const wrapValuesWithDateTime16 = require('../utils/wrapValuesWithDateTime.ts')

const giaves = [
  {
    id: 1,
    giaVe: 23710,
  },
  {
    id: 2,
    giaVe: 543543,
  },
  {
    id: 3,
    giaVe: 546,
  },
  {
    id: 4,
    giaVe: 534534,
  },
  {
    id: 5,
    giaVe: 40000,
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
