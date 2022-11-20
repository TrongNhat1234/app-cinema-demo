module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('phims', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ten_phim: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      thoi_luong_phim: {
        type: Sequelize.TIME,
        allowNull: false,
      },

      gioi_han_tuoi: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      ngay_cong_chieu: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      trang_thai: {
        type: Sequelize.BOOLEAN,
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
  },

  down: async (queryInterface) => queryInterface.dropTable('phims'),
}
