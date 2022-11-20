module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('calams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      gio_bat_dau: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      gio_ket_thuc: {
        type: Sequelize.TIME,
        allowNull: false,
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

  down: async (queryInterface) => queryInterface.dropTable('calams'),
}
