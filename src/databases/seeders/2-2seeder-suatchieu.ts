const wrapValuesWithDateTime11 = require('../utils/wrapValuesWithDateTime.ts')

const suatchieus = [
  {
    id: 1,
    gio_bat_dau: '08:00:00',
    gio_ket_thuc: '16:00:00',
    id_phim: 1,
    id_phong_chieu: 1,
    id_dinh_dang_phim: 1,
  },
  {
    id: 2,
    gio_bat_dau: '04:30:00',
    gio_ket_thuc: '22:30:00',
    id_phim: 1,
    id_phong_chieu: 2,
    id_dinh_dang_phim: 2,
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('suatchieus', wrapValuesWithDateTime11(suatchieus))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('suatchieus', {
        id: suatchieus.map((suatchieu) => suatchieu.id),
      }),
    ]
  },
}
