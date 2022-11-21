module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('suatchieus', {
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

      id_phong_chieu: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'phongchieus',
          key: 'id',
        },
      },

      id_dinh_dang_phim: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'dinhdangphims',
          key: 'id',
        },
      },

      id_phim: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'phims',
          key: 'id',
        },
      },
      ngay_chieu: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        field: 'ngay_chieu',
        defaultValue: new Date(),
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

  down: async (queryInterface) => queryInterface.dropTable('suatchieus'),
}
