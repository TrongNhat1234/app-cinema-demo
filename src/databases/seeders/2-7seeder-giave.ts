const wrapValuesWithDateTime16 = require('../utils/wrapValuesWithDateTime.ts')

const giaves = [
  {
    id: 1,
    gia_ve: 23710,
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
