module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('hoadonchitiets', {
      id_hoa_don_do_an: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'hoadondoans',
          key: 'id',
        },
      },
      id_do_an: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'doans',
          key: 'id',
        },
      },

      so_luong: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
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

  down: async (queryInterface) => queryInterface.dropTable('hoadonchitiets'),
}
