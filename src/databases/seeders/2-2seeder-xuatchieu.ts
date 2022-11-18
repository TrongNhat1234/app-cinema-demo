const wrapValuesWithDateTime11 = require('../utils/wrapValuesWithDateTime.ts')

const xuatchieus = [
  {
    id: 1,
    gioBatDau: '08:00:00',
    gioKetThuc: '16:00:00',
    idPhim: 1,
    idPhongChieu: 1,
    idDinhDangPhim: 1,
  },
  {
    id: 2,
    gioBatDau: '04:30:00',
    gioKetThuc: '22:30:00',
    idPhim: 1,
    idPhongChieu: 2,
    idDinhDangPhim: 2,
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('xuatchieus', wrapValuesWithDateTime11(xuatchieus))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('xuatchieus', {
        id: xuatchieus.map((xuatchieu) => xuatchieu.id),
      }),
    ]
  },
}
