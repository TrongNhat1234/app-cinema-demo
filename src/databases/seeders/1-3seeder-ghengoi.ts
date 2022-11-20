const wrapValuesWithDateTime4 = require('../utils/wrapValuesWithDateTime.ts')

const ghengois = [
  {
    id: 1,
    hang_so: 1,
    day_so: 1,
    da_chon: true,
    id_phong_chieu: 1,
    id_ghe: 1,
  },

  {
    id: 2,
    hang_so: 2,
    day_so: 2,
    da_chon: false,
    id_phong_chieu: 2,
    id_ghe: 2,
  },

  {
    id: 3,
    hang_so: 3,
    day_so: 3,
    da_chon: false,
    id_phong_chieu: 1,
    id_ghe: 3,
  },

  {
    id: 4,
    hang_so: 1,
    day_so: 4,
    da_chon: false,
    id_phong_chieu: 2,
    id_ghe: 4,
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('ghengois', wrapValuesWithDateTime4(ghengois))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('ghengois', {
        id: ghengois.map((ghengoi) => ghengoi.id),
      }),
    ]
  },
}
