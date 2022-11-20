const wrapValuesWithDateTime5 = require('../utils/wrapValuesWithDateTime.ts')

const phims = [
  {
    id: 1,
    ten_phim: 'squid game',
    thoi_luong_phim: '01:40:43',
    gioi_han_tuoi: 16,
    ngay_cong_chieu: '2022-12-01 00:00:00',
    trang_thai: true,
  },

  {
    id: 2,
    ten_phim: 'Cô dâu tám tuổi',
    thoi_luong_phim: '01:40:43',
    gioi_han_tuoi: 16,
    ngay_cong_chieu: '2022-12-01 00:00:00',
    trang_thai: true,
  },

  {
    id: 3,
    ten_phim: 'Về nhà đi con',
    thoi_luong_phim: '01:40:43',
    gioi_han_tuoi: 16,
    ngay_cong_chieu: '2022-12-01 00:00:00',
    trang_thai: true,
  },

  {
    id: 4,
    ten_phim: 'Bố già',
    thoi_luong_phim: '01:40:43',
    gioi_han_tuoi: 16,
    ngay_cong_chieu: '2022-12-01 00:00:00',
    trang_thai: true,
  },

  {
    id: 5,
    ten_phim: 'avata',
    thoi_luong_phim: '01:40:43',
    gioi_han_tuoi: 16,
    ngay_cong_chieu: '2022-12-01 00:00:00',
    trang_thai: true,
  },

  {
    id: 6,
    ten_phim: 'Táo Quân',
    thoi_luong_phim: '01:40:43',
    gioi_han_tuoi: 16,
    ngay_cong_chieu: '2022-12-01 00:00:00',
    trang_thai: true,
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('phims', wrapValuesWithDateTime5(phims))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('phims', {
        id: phims.map((phim) => phim.id),
      }),
    ]
  },
}
