const wrapValuesWithDateTime7 = require('../utils/wrapValuesWithDateTime.ts')

const theloaiphims = [
  {
    idPhim: 1,
    idTheLoai: 1,
  },

  {
    idPhim: 1,
    idTheLoai: 2,
  },

  {
    idPhim: 2,
    idTheLoai: 5,
  },

  {
    idPhim: 2,
    idTheLoai: 2,
  },

  {
    idPhim: 2,
    idTheLoai: 4,
  },

  {
    idPhim: 3,
    idTheLoai: 5,
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
          theloaiphim.idPhim, theloaiphim.idTheLoai
        }),
      }),
    ]
  },
}
