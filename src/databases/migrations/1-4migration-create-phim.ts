module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('phims', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tenPhim: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      thoiLuongPhim: {
        type: Sequelize.TIME,
        allowNull: false,
      },

      gioiHanTuoi: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      ngayCongChieu: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      trangThai: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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

  down: async (queryInterface) => queryInterface.dropTable('phims'),
}
