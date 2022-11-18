module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('doans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tenDoAn: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      gia: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },

      size: {
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

  down: async (queryInterface) => queryInterface.dropTable('doans'),
}
