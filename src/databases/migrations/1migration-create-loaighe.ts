module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('loaighes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tenGhe: {
        type: Sequelize.STRING,
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

  down: async (queryInterface) => queryInterface.dropTable('loaighes'),
}
