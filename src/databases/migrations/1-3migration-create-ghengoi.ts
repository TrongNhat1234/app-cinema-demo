module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('ghengois', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      day_so: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hang_so: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      da_chon: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      id_phong_chieu: {
        type: Sequelize.INTEGER,
        field: 'id_phong_chieu',
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
        references: {
          model: 'phongchieus',
          key: 'id',
        },
      },

      id_ghe: {
        type: Sequelize.INTEGER,
        field: 'id_ghe',
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
        references: {
          model: 'loaighes',
          key: 'id',
        },
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

  down: async (queryInterface) => queryInterface.dropTable('ghengois'),
}
