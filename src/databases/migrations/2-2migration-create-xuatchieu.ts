module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('xuatchieus', {
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

      idPhongChieu: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'phongchieus',
          key: 'id',
        },
      },

      idDinhDangPhim: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'dinhdangphims',
          key: 'id',
        },
      },

      idPhim: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'phims',
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

  down: async (queryInterface) => queryInterface.dropTable('xuatchieus'),
}
