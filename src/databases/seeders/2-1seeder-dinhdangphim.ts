const wrapValuesWithDateTime10 = require('../utils/wrapValuesWithDateTime.ts')

const dinhdangphims = [
  {
    id: 1,
    ten_dinh_dang: '2D',
  },

  {
    id: 2,
    ten_dinh_dang: '3D',
  },

  {
    id: 3,
    ten_dinh_dang: 'IMAX',
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
