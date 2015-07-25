var Sequelize = require('sequelize');

module.exports = function ($config, $methods) {

	// Database configuration
		var dbConfig = $config.databases['main'][$config.env];

	// Create database
		var db = new Sequelize(
			dbConfig.database,
			dbConfig.username,
			dbConfig.password,
			dbConfig.options
		);

	// Setup models

		// Basic user data
		var Person = db.define('Person', {
			name: Sequelize.STRING,
			documentNumber: { type: Sequelize.INTEGER, unique: true },
			email: { type: Sequelize.STRING, unique: true },
			sex: Sequelize.CHAR
		},
			{
				classMethods: $methods.Person.Class,
				instanceMethods: $methods.Person.Instance
			}
		);

		// User credentials
		var Credential = db.define('Credential', {
			username: Sequelize.STRING,
			password: Sequelize.STRING,
			active: Sequelize.BOOLEAN
		});

		// User session key
		var SessionKey = db.define('SessionKey', {
			key: Sequelize.STRING
		});

		// Type of document: DNI, Passport, etc..
		var DocumentType = db.define('DocumentType', {
			name: Sequelize.STRING
		});

		// Any geographic zone: Country, City, District, etc..
		var GeoZone = db.define('GeoZone', {
			name: Sequelize.STRING
		});

		// Type of employee: Seller, Boss, Secretary, etc..
		var EmployeeType = db.define('EmployeeType', {
			name: Sequelize.STRING,
			description: Sequelize.STRING
		});

		// App feature: Manage sellers, Create coins, Manage logs, etc..
		var Feature = db.define('Feature', {
			name: Sequelize.STRING,
			description: Sequelize.STRING,
			accessNumber: Sequelize.INTEGER
		});

		// Employee role linked to a employee type: Sellers manager, etc..
		var EmployeeRole = db.define('EmployeeRole', {
			name: Sequelize.STRING,
			description: Sequelize.STRING,
			featuresAccess: Sequelize.INTEGER
		});

		// Employee data
		var Employee = db.define('Employee', {
			active: Sequelize.BOOLEAN
		});

		// Media data
		var Media = db.define('Media', {
			available: Sequelize.BOOLEAN,
			name: Sequelize.STRING,
			type: Sequelize.STRING,
			url: Sequelize.STRING
		});


		Credential.belongsTo( Person );
		SessionKey.belongsTo( Person );
		GeoZone.belongsTo( GeoZone, { as: 'ParentGeoZone' } );
		Person.belongsTo( GeoZone, { as: 'District' } );
		Person.belongsTo( DocumentType );
		EmployeeType.belongsTo( EmployeeType, { as: 'ParentEmployeeType' } )
		Employee.belongsTo( Person );
		Employee.belongsTo( EmployeeType );
		Employee.belongsTo( EmployeeRole );


	// Sync database
		db.sync();

	return db;
}