const wrapValuesWithDateTime15 = require('../utils/wrapValuesWithDateTime.ts')

const khachhangs = [
  {
    id: 1,
    soDienThoai: '0869269975',
    matKhau: '123456',
    tenKhachHang: 'Nguyễn Trọng Nhất',
    ngaySinh: '2001/08/10',
    email: 'nhat123@gmail.com',
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('khachhangs', wrapValuesWithDateTime15(khachhangs))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('khachhangs', {
        id: khachhangs.map((khachhang) => khachhang.id),
      }),
    ]
  },
}
