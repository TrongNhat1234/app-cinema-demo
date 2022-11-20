const wrapValuesWithDateTime3 = require('../utils/wrapValuesWithDateTime.ts')

const phongchieus = [
  {
    id: 1,
    ten_phong_chieu: 'phongchieu01',
  },
  {
    id: 2,
    ten_phong_chieu: 'phongchieu02',
  },
  {
    id: 3,
    ten_phong_chieu: 'phongchieu03',
  },
  {
    id: 4,
    ten_phong_chieu: 'phongchieu04',
  },
  {
    id: 5,
    ten_phong_chieu: 'phongchieu05',
  },
  {
    id: 6,
    ten_phong_chieu: 'phongchieu06',
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('phongchieus', wrapValuesWithDateTime3(phongchieus))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('phongchieus', {
        id: phongchieus.map((phongchieu) => phongchieu.id),
      }),
    ]
  },
}
