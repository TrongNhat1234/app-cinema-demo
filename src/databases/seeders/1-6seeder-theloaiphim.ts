const wrapValuesWithDateTime7 = require('../utils/wrapValuesWithDateTime.ts')

const theloaiphims = [
  {
    id_phim: 1,
    id_the_loai: 1,
  },

  {
    id_phim: 1,
    id_the_loai: 2,
  },

  {
    id_phim: 2,
    id_the_loai: 5,
  },

  {
    id_phim: 2,
    id_the_loai: 2,
  },

  {
    id_phim: 2,
    id_the_loai: 4,
  },

  {
    id_phim: 3,
    id_the_loai: 5,
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('theloaiphims', wrapValuesWithDateTime7(theloaiphims))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('theloaiphims', {
        id: theloaiphims.map((theloaiphim) => {
          theloaiphim.id_phim, theloaiphim.id_the_loai
        }),
      }),
    ]
  },
}
