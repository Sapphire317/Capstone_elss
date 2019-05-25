#!/bin/bash


export COMPOSER_CARD=admin@elss

export COMPOSER_NAMESPACES=never

export COMPOSER_AUTHENTICATION=true

export COMPOSER_PROVIDERS='{
    "google": {
        "provider": "google",
        "module": "passport-google-oauth2",
        "clientID": "830576976759-2vj7f0s59shgrq9d6913e9e573tp0k3q.apps.googleusercontent.com",
	"clientSecret": "CK7MzJ1DiKVHjbITejBoDmsu",
        "authPath": "/auth/google",
        "callbackURL": "/auth/google/callback",
        "scope": "https://www.googleapis.com/auth/plus.login",
        "successRedirect": "http://localhost:4200",
        "failureRedirect": "/"
    }  
}'

composer-rest-server
