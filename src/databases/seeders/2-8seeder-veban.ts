const wrapValuesWithDateTime17 = require('../utils/wrapValuesWithDateTime.ts')

const vebans = [
  {
    id: 1,
    tong_tien: 24242.3,
    id_suat_chieu: 1,
    id_gia_ve: 1,
    id_ghe_ngoi: 3,
    id_nhan_vien: 1,
    id_khach_hang: 1,
  },

  {
    id: 2,
    tong_tien: 34242.3,
    id_suat_chieu: 2,
    id_gia_ve: 4,
    id_ghe_ngoi: 1,
    id_nhan_vien: 1,
    id_khach_hang: 1,
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
