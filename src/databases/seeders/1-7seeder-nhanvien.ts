const wrapValuesWithDateTime1 = require('../utils/wrapValuesWithDateTime.ts')

const nhanviens = [
  {
    id: 1,
    ho_ten: 'name NV 1',
    ngay_sinh: '2022-02-01',
    dia_chi: '$2b$10$uAAaPu7svUAz8XLjEApZoOTL3/zYUTAj1VSz82HRozhWpJdbT7y1S',
    email: 'nv01@gmail.com',
    ngay_vao_lam: '2022-02-01',
    gioi_tinh: true,
    mat_khau: '123456',
    vai_tro: 'nv',
  },
  {
    id: 2,
    ho_ten: 'name admin 1',
    ngay_sinh: '2022-02-01',
    dia_chi: '$2b$10$uAAaPu7svUAz8XLjEApZoOTL3/zYUTAj1VSz82HRozhWpJdbT7y1S',
    email: 'admin01@gmail.com',
    ngay_vao_lam: '2022-02-01',
    gioi_tinh: true,
    mat_khau: '123456',
    vai_tro: 'admin',
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('nhanviens', wrapValuesWithDateTime1(nhanviens))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('nhanviens', {
        id: nhanviens.map((nhanvien) => nhanvien.id),
      }),
    ]
  },
}
