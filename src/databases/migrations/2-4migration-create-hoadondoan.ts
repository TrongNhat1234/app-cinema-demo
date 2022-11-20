module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('hoadondoans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ngay_ban: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: new Date(),
      },

      giam_gia: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },

      tong_tien: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },

      is_delete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
        defaultValue: new Date(),
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
        defaultValue: new Date(),
      },
    })
  },

  down: async (queryInterface) => queryInterface.dropTable('hoadondoans'),
}
