const wrapValuesWithDateTime3 = require('../utils/wrapValuesWithDateTime.ts')

const phongchieus = [
  {
    id: 1,
    tenPhongChieu: 'phongchieu01',
  },
  {
    id: 2,
    tenPhongChieu: 'phongchieu02',
  },
  {
    id: 3,
    tenPhongChieu: 'phongchieu03',
  },
  {
    id: 4,
    tenPhongChieu: 'phongchieu04',
  },
  {
    id: 5,
    tenPhongChieu: 'phongchieu05',
  },
  {
    id: 6,
    tenPhongChieu: 'phongchieu06',
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
