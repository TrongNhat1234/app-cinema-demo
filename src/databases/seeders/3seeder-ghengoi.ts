const wrapValuesWithDateTime4 = require('../utils/wrapValuesWithDateTime.ts')

const ghengois = [
  {
    id: 1,
    hangSo: 1,
    daySo: 1,
    daChon: true,
    idPhongChieu: 1,
    idGhe: 1,
  },

  {
    id: 2,
    hangSo: 2,
    daySo: 2,
    daChon: false,
    idPhongChieu: 2,
    idGhe: 2,
  },

  {
    id: 3,
    hangSo: 3,
    daySo: 3,
    daChon: false,
    idPhongChieu: 1,
    idGhe: 3,
  },

  {
    id: 4,
    hangSo: 1,
    daySo: 4,
    daChon: false,
    idPhongChieu: 2,
    idGhe: 4,
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('ghengois', wrapValuesWithDateTime4(ghengois))]
  },

  async down(queryInterface) {
    return [await queryInterface.bulkDelete('ghengois', null, {})]
  },
}
