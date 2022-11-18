module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('calams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      gioBatDau: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      gioKetThuc: {
        type: Sequelize.TIME,
        allowNull: false,
      },

      isDelete: {
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

  down: async (queryInterface) => queryInterface.dropTable('calams'),
}
