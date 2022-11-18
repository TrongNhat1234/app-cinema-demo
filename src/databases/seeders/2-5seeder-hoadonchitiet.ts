const wrapValuesWithDateTime14 = require('../utils/wrapValuesWithDateTime.ts')

const hoadonchitiets = [
  {
    idDoAn: 1,
    idHoaDonDoAn: 1,
    soLuong: 1,
  },

  {
    idDoAn: 7,
    idHoaDonDoAn: 1,
    soLuong: 2,
  },
  {
    idDoAn: 2,
    idHoaDonDoAn: 2,
    soLuong: 1,
  },

  {
    idDoAn: 8,
    idHoaDonDoAn: 2,
    soLuong: 1,
  },
  {
    idDoAn: 8,
    idHoaDonDoAn: 3,
    soLuong: 2,
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
          hoadonchitiet.idDoAn, hoadonchitiet.idHoaDonDoAn
        }),
      }),
    ]
  },
}
