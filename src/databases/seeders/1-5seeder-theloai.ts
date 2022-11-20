const wrapValuesWithDateTime6 = require('../utils/wrapValuesWithDateTime.ts')

const theloais = [
  {
    id: 1,
    ten_the_loai: 'Bom tấn',
  },

  {
    id: 2,
    ten_the_loai: 'Gia đình',
  },

  {
    id: 3,
    ten_the_loai: 'Kinh dị',
  },

  {
    id: 4,
    ten_the_loai: 'Hài hước',
  },

  {
    id: 5,
    ten_the_loai: 'Viễn tưởng',
  },

  {
    id: 6,
    ten_the_loai: 'Phiêu lưu',
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
