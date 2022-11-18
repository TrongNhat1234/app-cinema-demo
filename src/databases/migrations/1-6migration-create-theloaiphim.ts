module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('theloaiphims', {
      idPhim: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'phims',
          key: 'id',
        },
      },
      idTheLoai: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'theloais',
          key: 'id',
        },
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

  down: async (queryInterface) => queryInterface.dropTable('theloaiphims'),
}
