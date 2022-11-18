module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('ghengois', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      daySo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hangSo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      daChon: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      idPhongChieu: {
        type: Sequelize.INTEGER,
        field: 'idPhongChieu',
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
        references: {
          model: 'phongchieus',
          key: 'id',
        },
      },

      idGhe: {
        type: Sequelize.INTEGER,
        field: 'idGhe',
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
        references: {
          model: 'loaighes',
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

  down: async (queryInterface) => queryInterface.dropTable('ghengois'),
}
