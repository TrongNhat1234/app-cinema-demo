module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('nhanviens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ho_ten: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ngay_sinh: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      dia_chi: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      ngay_vao_lam: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      gioi_tinh: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      mat_khau: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vai_tro: {
        type: Sequelize.STRING,
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
