module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('khachhangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tenKhachHang: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      diaChi: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      soDienThoai: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      matKhau: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      ngaySinh: {
        type: Sequelize.DATEONLY,
        allowNull: true,
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

  down: async (queryInterface) => queryInterface.dropTable('khachhangs'),
}
