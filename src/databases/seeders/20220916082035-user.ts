const wrapValuesWithDateTime21 = require('../utils/wrapValuesWithDateTime.ts')

const loginadmins = [
  {
    id: 1,
    email: 'user01@example.com',
    password: '123456',
  },

  {
    id: 2,
    email: 'user02@example.com',
    password: '123456',
  },

  {
    id: 3,
    email: 'user03@example.com',
    password: '123456',
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('loginadmins', wrapValuesWithDateTime21(loginadmins))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('loginadmins', {
        id: loginadmins.map((loginadmin) => loginadmin.id),
      }),
    ]
  },
}
