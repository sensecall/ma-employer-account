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
const providers = require('./providers.json')

module.exports = {
	// URLS
	'providerPermissionsURL': 'https://esfa:educ4tion@das-registration-prototype.herokuapp.com/provider-permissions/providers',
	'payeURL': 'https://esfa:educ4tion@das-registration-prototype.herokuapp.com/registration/add-paye-scheme',
	'signAgreementURL': 'https://esfa:educ4tion@das-registration-prototype.herokuapp.com/registration/agreement',
	'recruitmentURL': 'https://esfa:educ4tion@das-registration-prototype.herokuapp.com/recruitment/recruitment',
	
	// states
	'add-paye-now': 'yes',
	'sign-agreement-now': 'yes',
	'reserved-funding': '',

	// Other
	'apprenticeships': apprenticeships,
	'providers': providers,
	'employer-name': "Aardvark Zebra Ltd",
	'started': 'false',

	// apprenticeship details
	'apprentice': {
		"first-name": "Jay",
		"last-name": "Smith"
	},
	'reservation': {
		'course-name': 'Business Administrator, Level: 3 (Standard)'
	},
	'reservation-months': 4,
	"apprenticeship-cost": 1200,
	"apprentice-dob-day": "02",
	"apprentice-dob-month": "02",
	"apprentice-dob-year": "2001",
	"provider-name": "COVENTRY COLLEGE",
	'apprenticeship-start-date-month': "January",
	'apprenticeship-start-date-year': 2020,
	'apprenticeship-finish-date-month': 'February',
	'apprenticeship-finish-date-year': 2021
}
