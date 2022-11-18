const wrapValuesWithDateTime17 = require('../utils/wrapValuesWithDateTime.ts')

const vebans = [
  {
    id: 1,
    tongTien: 24242.3,
    idXuatChieu: 1,
    idGiaVe: 1,
    idGheNgoi: 3,
    idNhanVien: 1,
    idKhachHang: 1,
  },

  {
    id: 2,
    tongTien: 34242.3,
    idXuatChieu: 2,
    idGiaVe: 4,
    idGheNgoi: 1,
    idNhanVien: 1,
    idKhachHang: 1,
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('vebans', wrapValuesWithDateTime17(vebans))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('vebans', {
        id: vebans.map((veban) => veban.id),
      }),
    ]
  },
}
