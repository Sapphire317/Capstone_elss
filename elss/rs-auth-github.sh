#!/bin/bash

# Setup the Environment variables for the REST Server

#1. Set up the card to be used
export COMPOSER_CARD=admin@elss

#2. Set up the namespace usage 		always | never
export COMPOSER_NAMESPACE=never

#3. Set up the REST server Authentication 	true | false
export COMPOSER_AUTHENTICATION=true

#4. Set up the Passport strategy provider
export COMPOSER_PROVIDERS='{
	"github": {
		"provider": "github",
		"module": "passport-github",
		"clientID": "9cca7ee5a28b1ccba20f",
		"clientSecret": "6d5c1f4e2ace1beaaa32d7fef4d543fde0fd63c9",
		"authPath": "/auth/github/",
		"scope": "read:user, user:email",
		"callbackURL": "/auth/github/callback",
		"successRedirect": "http://localhost:4200",
		"failureRedirect": "/"
	}
}'

#5. Execute the rest server
composer-rest-server
