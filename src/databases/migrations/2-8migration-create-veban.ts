module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('vebans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ngayBan: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },

      tongTien: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      idXuatChieu: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'xuatchieus',
          key: 'id',
        },
      },
      idGiaVe: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'giaves',
          key: 'id',
        },
      },
      idGheNgoi: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'ghengois',
          key: 'id',
        },
      },
      idNhanVien: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'nhanviens',
          key: 'id',
        },
      },
      idKhachHang: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'khachhangs',
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

  down: async (queryInterface) => queryInterface.dropTable('vebans'),
}
