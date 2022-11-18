const wrapValuesWithDateTime5 = require('../utils/wrapValuesWithDateTime.ts')

const phims = [
  {
    id: 1,
    tenPhim: 'squid game',
    thoiLuongPhim: '01:40:43',
    gioiHanTuoi: 16,
    ngayCongChieu: '2022-12-01 00:00:00',
    trangThai: true,
  },

  {
    id: 2,
    tenPhim: 'Cô dâu tám tuổi',
    thoiLuongPhim: '01:40:43',
    gioiHanTuoi: 16,
    ngayCongChieu: '2022-12-01 00:00:00',
    trangThai: true,
  },

  {
    id: 3,
    tenPhim: 'Về nhà đi con',
    thoiLuongPhim: '01:40:43',
    gioiHanTuoi: 16,
    ngayCongChieu: '2022-12-01 00:00:00',
    trangThai: true,
  },

  {
    id: 4,
    tenPhim: 'Bố già',
    thoiLuongPhim: '01:40:43',
    gioiHanTuoi: 16,
    ngayCongChieu: '2022-12-01 00:00:00',
    trangThai: true,
  },

  {
    id: 5,
    tenPhim: 'avata',
    thoiLuongPhim: '01:40:43',
    gioiHanTuoi: 16,
    ngayCongChieu: '2022-12-01 00:00:00',
    trangThai: true,
  },

  {
    id: 6,
    tenPhim: 'Táo Quân',
    thoiLuongPhim: '01:40:43',
    gioiHanTuoi: 16,
    ngayCongChieu: '2022-12-01 00:00:00',
    trangThai: true,
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('phims', wrapValuesWithDateTime5(phims))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('phims', {
        id: phims.map((theloaiphim) => theloaiphim.id),
      }),
    ]
  },
}
