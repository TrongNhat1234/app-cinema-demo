module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('khachhangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ten_khach_hang: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      dia_chi: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      so_dien_thoai: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      mat_khau: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      ngay_sinh: {
        type: Sequelize.DATEONLY,
        allowNull: true,
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
      QueryInterface.addIndex('khachhangs', ['so_dien_thoai'], {
        name: ['khachhangs', 'so_dien_thoai', 'unique'].join('_'),
        indicesType: 'unique',
        type: 'unique',
      }),
    ])
  },

  down: async (queryInterface) => queryInterface.dropTable('khachhangs'),
}
