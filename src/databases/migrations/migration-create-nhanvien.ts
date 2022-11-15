module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('nhanviens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      hoTen: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ngaySinh: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      diaChi: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      ngayVaoLam: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      gioiTinh: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      matKhau: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vaiTro: {
        type: Sequelize.STRING,
        allowNull: false,
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

    await Promise.all([
      QueryInterface.addIndex('nhanviens', ['email'], {
        name: ['nhanviens', 'email', 'unique'].join('_'),
        indicesType: 'unique',
        type: 'unique',
      }),
    ])
  },

  down: async (queryInterface) => queryInterface.dropTable('nhanviens'),
}
