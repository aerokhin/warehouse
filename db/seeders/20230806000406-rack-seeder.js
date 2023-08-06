module.exports = {
	up: async (queryInterface, Sequelize) => {
		const [ store ] = await queryInterface.sequelize.query('SELECT id FROM stores LIMIT 1');
		const { id } = store[0];
		const aliases = [ 'AA', 'AB', 'BA', 'BB', 'CA', 'CB' ];
		const records = aliases.map((alias, i) => ({
			alias,
			store_id: id,
			name: `Rack ${i + 1}`,
			meta: JSON.stringify({}),
			enabled: true
		}));

		return queryInterface.bulkInsert('racks', records, {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('racks', null, {});
	}
};
