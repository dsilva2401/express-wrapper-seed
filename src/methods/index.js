module.exports = function ($methods, $database, $q, $config, $global) {
	
	// Dependencies
	var $ = {};
	$.database = $database;
	$.q = $q;
	$.config = $config;
	$.global = $global;

	// Response
	$methods.Response = require('./Response')($);

	// Person
	$methods.Person = {};
	$methods.Person.Class = require('./Person.Class')($);
	$methods.Person.Instance = require('./Person.Instance')($);

	// Credential
	$methods.Credential = {};
	$methods.Credential.Class = require('./Credential.Class')($);

	// Session key
	$methods.SessionKey = {};
	$methods.SessionKey.Class = require('./SessionKey.Class')($);

	// GeoZone
	$methods.GeoZone = {};
	$methods.GeoZone.Class = require('./GeoZone.Class')($);

	// ItemGroup
	$methods.ItemGroup = {};
	$methods.ItemGroup.Class = require('./ItemGroup.Class')($);

}