const wrapValuesWithDateTime1 = require('../utils/wrapValuesWithDateTime.ts')

const nhanviens = [
  {
    id: 1,
    hoTen: 'name NV 1',
    ngaySinh: '2022-02-01',
    diaChi: '$2b$10$uAAaPu7svUAz8XLjEApZoOTL3/zYUTAj1VSz82HRozhWpJdbT7y1S',
    email: 'nv01@gmail.com',
    ngayVaoLam: '2022-02-01',
    gioiTinh: true,
    matKhau: '123456',
    vaiTro: 'nv',
  },
  {
    id: 2,
    hoTen: 'name admin 1',
    ngaySinh: '2022-02-01',
    diaChi: '$2b$10$uAAaPu7svUAz8XLjEApZoOTL3/zYUTAj1VSz82HRozhWpJdbT7y1S',
    email: 'admin01@gmail.com',
    ngayVaoLam: '2022-02-01',
    gioiTinh: true,
    matKhau: '123456',
    vaiTro: 'admin',
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
