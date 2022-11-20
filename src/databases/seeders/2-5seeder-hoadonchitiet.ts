const wrapValuesWithDateTime14 = require('../utils/wrapValuesWithDateTime.ts')

const hoadonchitiets = [
  {
    id_do_an: 1,
    id_hoa_don_do_an: 1,
    so_luong: 1,
  },

  {
    id_do_an: 7,
    id_hoa_don_do_an: 1,
    so_luong: 2,
  },
  {
    id_do_an: 2,
    id_hoa_don_do_an: 2,
    so_luong: 1,
  },

  {
    id_do_an: 8,
    id_hoa_don_do_an: 2,
    so_luong: 1,
  },
  {
    id_do_an: 8,
    id_hoa_don_do_an: 3,
    so_luong: 2,
  },
]

module.exports = {
  async up(queryInterface) {
    return [
      await queryInterface.bulkInsert('hoadonchitiets', wrapValuesWithDateTime14(hoadonchitiets)),
    ]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('hoadonchitiets', {
        id: hoadonchitiets.map((hoadonchitiet) => {
          hoadonchitiet.id_do_an, hoadonchitiet.id_hoa_don_do_an
        }),
      }),
    ]
  },
}
