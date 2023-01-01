module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('vebans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ngay_ban: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      id_suat_chieu: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'suatchieus',
          key: 'id',
        },
      },

      id_ghe_ngoi: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'ghengois',
          key: 'id',
        },
      },
      id_nhan_vien: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'nhanviens',
          key: 'id',
        },
      },
      id_khach_hang: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'khachhangs',
          key: 'id',
        },
      },

      gia_ve: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },

      trang_thai: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, //0 là chưa mua, 1 là đã mua, 2 là đang chọn
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

  down: async (queryInterface) => queryInterface.dropTable('vebans'),
}
