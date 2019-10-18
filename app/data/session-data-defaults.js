/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

const apprenticeships = require('./apprenticeships.json')

module.exports = {
	// URLS
	'providerPermissionsURL': 'https://esfa:educ4tion@das-registration-prototype.herokuapp.com/provider-permissions/providers',
	'payeURL': 'https://esfa:educ4tion@das-registration-prototype.herokuapp.com/add-paye-scheme',
	'signAgreementURL': 'https://esfa:educ4tion@das-registration-prototype.herokuapp.com/agreement',
	
	// Other
	'apprenticeships': apprenticeships,
	'employer-name': "Aardvark Zebra Ltd"
}
