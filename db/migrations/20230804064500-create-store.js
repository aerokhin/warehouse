module.exports = {
  up: (queryInterface, Sequelize) => {
	  return queryInterface.createTable('stores', {
		  id: {
			  allowNull: false,
			  autoIncrement: true,
			  primaryKey: true,
			  type: Sequelize.INTEGER
		  },
		  name: {
			  type: Sequelize.STRING,
			  allowNull: false
		  },
		  meta: {
			  type: Sequelize.JSON,
			  allowNull: false,
			  defaultValue: {}
		  },
		  enabled: {
			  type: Sequelize.BOOLEAN,
			  allowNull: false,
			  defaultValue: true
		  },
		  createdAt: {
			  allowNull: false,
			  type: Sequelize.DATE,
			  field: 'created_at',
			  defaultValue: Sequelize.literal('NOW()')
		  },
		  updatedAt: {
			  allowNull: false,
			  type: Sequelize.DATE,
			  field: 'updated_at',
			  defaultValue: Sequelize.literal('NOW()')
		  }
	  });
  },

  down: (queryInterface, Sequelize) => {
	  return queryInterface.dropTable('stores');
  }
};
