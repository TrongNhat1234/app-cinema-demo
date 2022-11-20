const wrapValuesWithDateTime15 = require('../utils/wrapValuesWithDateTime.ts')

const khachhangs = [
  {
    id: 1,
    so_dien_thoai: '0869269975',
    mat_khau: '123456',
    ten_khach_hang: 'Nguyễn Trọng Nhất',
    ngay_sinh: '2001/08/10',
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
