const wrapValuesWithDateTime10 = require('../utils/wrapValuesWithDateTime.ts')

const dinhdangphims = [
  {
    id: 1,
    tenDinhDang: 'Định Dạng A',
  },

  {
    id: 2,
    tenDinhDang: 'Định Dạng B',
  },

  {
    id: 3,
    tenDinhDang: 'Định Dạng C',
  },
]

module.exports = {
  async up(queryInterface) {
    return [
      await queryInterface.bulkInsert('dinhdangphims', wrapValuesWithDateTime10(dinhdangphims)),
    ]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('dinhdangphims', {
        id: dinhdangphims.map((dinhdangphim) => dinhdangphim.id),
      }),
    ]
  },
}
