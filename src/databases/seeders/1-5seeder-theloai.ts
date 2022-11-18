const wrapValuesWithDateTime6 = require('../utils/wrapValuesWithDateTime.ts')

const theloais = [
  {
    id: 1,
    tenTheLoai: 'Bom tấn',
  },

  {
    id: 2,
    tenTheLoai: 'Gia đình',
  },

  {
    id: 3,
    tenTheLoai: 'Kinh dị',
  },

  {
    id: 4,
    tenTheLoai: 'Hài hước',
  },

  {
    id: 5,
    tenTheLoai: 'Viễn tưởng',
  },

  {
    id: 6,
    tenTheLoai: 'Phiêu lưu',
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('theloais', wrapValuesWithDateTime6(theloais))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('theloais', {
        id: theloais.map((theloai) => theloai.id),
      }),
    ]
  },
}
