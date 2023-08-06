module.exports = {
  up: (queryInterface, Sequelize) => {
	  return queryInterface.bulkInsert('stores', [
		  {
			  name: 'LA Primary Store',
			  meta: JSON.stringify({}),
			  enabled: true
		  }
	  ], {});
  },

  down: (queryInterface, Sequelize) => {
	  return queryInterface.bulkDelete('stores', null, {});
  }
};
